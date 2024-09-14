import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { isDefined } from "@app/shared/util/is-defined";
import { Store } from "@ngrx/store";
import {
  delayWhen,
  filter,
  first,
  interval,
  map,
  tap,
  withLatestFrom,
} from "rxjs";

@Injectable()
export class SudokuSolverEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private solver: SudokuSolverService,
  ) {}

  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuSolverActions.initializeFromPuzzleState),
      withLatestFrom(this.store.select(SudokuPuzzleSelectors.selectSudoku)),
      map(([_action, puzzle]) => puzzle),
      filter(isDefined),
      map((puzzle) => SudokuSolverActions.setInitialPuzzle({ puzzle: puzzle })),
    ),
  );

  resetSolverOnReset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          SudokuSolverActions.solverReset,
          SudokuSolverActions.solverRestart,
          SudokuSolverActions.solverCancel,
        ),
        tap(() => this.solver.reset()),
      ),
    { dispatch: false },
  );

  executeFirstStepOnStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuSolverActions.solverStart),
      map(() => SudokuSolverActions.stepExecute()),
    ),
  );

  scheduleNextStepOnStepResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuSolverActions.stepResult),
      withLatestFrom(this.store.select(SudokuSolverSelectors.selectDelay)),
      delayWhen(([_action, delay]) => interval(delay).pipe(first())),
      withLatestFrom(
        this.store.select(SudokuSolverSelectors.selectExecutionStatus),
      ),
      map(([_action, status]) =>
        status === "RUNNING"
          ? SudokuSolverActions.stepExecute()
          : SudokuSolverActions.stepDoNothing(),
      ),
    ),
  );

  executeNextStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SudokuSolverActions.stepExecute),
      withLatestFrom(this.store.select(SudokuSolverSelectors.selectResponse)),
      map(([_action, response]) => this.solver.solveNextStep(response)),
      withLatestFrom(
        this.store.select(SudokuSolverSelectors.selectResponse),
        this.store.select(SudokuSolverSelectors.selectMaxSteps),
        this.store.select(SudokuSolverSelectors.selectExecutedSteps),
        this.store.select(SudokuSolverSelectors.selectExecutionStatus),
        this.store.select(SudokuSolverSelectors.selectStepToBePausedAfter),
      ),
      map(
        ([
          newResponse,
          previousResponse,
          maxSteps,
          executedSteps,
          status,
          pauseAfterStep,
        ]) =>
          SudokuSolverActions.stepResult({
            response: newResponse,
            status: this.determineNewStatus(
              newResponse,
              executedSteps,
              maxSteps,
              pauseAfterStep,
              status,
            ),
            numberOfNewBranchesCreated: this.determineNumberOfNewBranches(
              previousResponse,
              newResponse,
            ),
          }),
      ),
    ),
  );

  private determineNewStatus(
    newResponse: SolverResponse,
    executedSteps: number,
    maxSteps: number,
    pauseAfterStep: Nullable<number>,
    status: SolverExecution,
  ): "RUNNING" | "PAUSED" | "DONE" | "FAILED" {
    if (
      status !== "DONE" &&
      status !== "FAILED" &&
      executedSteps + 1 >= maxSteps
    ) {
      // this step reaches the maximum steps
      return "FAILED";
    } else if (pauseAfterStep != null && executedSteps + 1 === pauseAfterStep) {
      // this step reaches the step to be paused at
      return "PAUSED";
    } else if (newResponse.status === "COMPLETE") {
      return "DONE";
    } else if (newResponse.status === "FAILED") {
      return "FAILED";
    }
    {
      return status === "NOT_STARTED" ? "PAUSED" : status;
    }
  }

  private determineNumberOfNewBranches(
    previousResponse: SolverResponse,
    newResponse: SolverResponse,
  ): number {
    return Math.max(
      0,
      newResponse.branches.length - previousResponse.branches.length,
    );
  }
}
