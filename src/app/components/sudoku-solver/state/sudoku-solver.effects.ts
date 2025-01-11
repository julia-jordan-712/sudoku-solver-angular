/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/types/nullable";
import { SolverExecution } from "@app/types/solver-execution";
import { isDefined } from "@app/util/is-defined";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { delayWhen, filter, first, interval, map, tap } from "rxjs";

@Injectable()
export class SudokuSolverEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private solver: SudokuSolverService,
  ) {}

  initializeSolverOnSubmitSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleSolverSwitchActions.submitPuzzle),
      concatLatestFrom(() =>
        this.store.select(SudokuPuzzleSelectors.selectSudoku),
      ),
      map(([_action, puzzle]) => puzzle),
      filter(isDefined),
      map((puzzle) => SudokuSolverActions.setInitialPuzzle({ puzzle: puzzle })),
    );
  });

  resetSolverOnChangeSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuPuzzleSolverSwitchActions.changePuzzle),
      map(() => SudokuSolverActions.solverReset()),
    );
  });

  resetSolverOnResetOrRestartOrCancel$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          SudokuSolverActions.solverReset,
          SudokuSolverActions.solverRestart,
          SudokuSolverActions.solverCancel,
        ),
        tap(() => this.solver.reset()),
      );
    },
    { dispatch: false },
  );

  executeFirstStepOnStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuSolverActions.solverStart),
      map(() => SudokuSolverActions.stepExecute()),
    );
  });

  scheduleNextStepOnStepResult$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuSolverActions.stepResult),
      concatLatestFrom(() =>
        this.store.select(SudokuSolverSelectors.selectDelay),
      ),
      delayWhen(([_action, delay]) => interval(delay).pipe(first())),
      concatLatestFrom(() =>
        this.store.select(SudokuSolverSelectors.selectExecutionStatus),
      ),
      map(([[_action, _delay], status]) =>
        status === "RUNNING"
          ? SudokuSolverActions.stepExecute()
          : SudokuSolverActions.stepDoNothing(),
      ),
    );
  });

  executeNextStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SudokuSolverActions.stepExecute),
      concatLatestFrom(() =>
        this.store.select(SudokuSolverSelectors.selectResponse),
      ),
      map(([_action, response]) => this.solver.solveNextStep(response)),
      concatLatestFrom(() => [
        this.store.select(SudokuSolverSelectors.selectResponse),
        this.store.select(SudokuSolverSelectors.selectMaxSteps),
        this.store.select(SudokuSolverSelectors.selectExecutedSteps),
        this.store.select(SudokuSolverSelectors.selectExecutionStatus),
        this.store.select(SudokuSolverSelectors.selectStepToBePausedAfter),
      ]),
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
    );
  });

  private determineNewStatus(
    newResponse: SolverResponse,
    executedSteps: number,
    maxSteps: number,
    pauseAfterStep: Nullable<number>,
    status: SolverExecution,
  ): "RUNNING" | "PAUSED" | "DONE" | "FAILED" {
    if (newResponse.status === "COMPLETE") {
      return "DONE";
    } else if (newResponse.status === "FAILED") {
      return "FAILED";
    } else {
      if (executedSteps + 1 >= maxSteps) {
        // this step reaches the maximum steps
        return "FAILED";
      } else if (
        pauseAfterStep != null &&
        executedSteps + 1 === pauseAfterStep
      ) {
        // this step reaches the step to be paused at
        return "PAUSED";
      }
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
