import { Injectable, inject } from "@angular/core";
import { SudokuSolverState } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { Nullable } from "@app/shared/types/nullable";
import {
  SolverExecution,
  SolverExecutionState,
} from "@app/shared/types/solver-execution";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  withLatestFrom,
} from "rxjs";
import { v4 as randomUUID } from "uuid";

@Injectable()
export class SudokuSolverStateService implements SudokuSolverState {
  private solver: SudokuSolverService = inject(SudokuSolverService);

  private delay = new BehaviorSubject<number>(0);
  private execution$ = new BehaviorSubject<SolverExecution>("NOT_STARTED");
  private executionId$ = new BehaviorSubject<string>(randomUUID());
  private highlightNumber$ = new BehaviorSubject<Nullable<number>>(undefined);
  private initialPuzzle: SudokuGrid = [];
  private maxSteps$ = new BehaviorSubject<number>(10_000);
  private pauseAfterStep$ = new BehaviorSubject<Nullable<number>>(undefined);
  private response$ = new BehaviorSubject<SolverResponse>(
    this.createInitialSolverResponse(),
  );
  private stepsExecuted$ = new BehaviorSubject<number>(0);

  private createInitialSolverResponse(puzzle?: SudokuGrid): SolverResponse {
    return {
      branches: puzzle ? [SolverBranch.createInitialBranch(puzzle)] : [],
      status: "UNKNOWN",
      stepId: "",
    };
  }

  private stopWatch: StopWatch = new StopWatch();

  getViewModels(): Observable<SudokuGridViewModel[]> {
    return combineLatest([this.response$, this.executionId$]).pipe(
      withLatestFrom(this.execution$),
      map(([[response, id], state]) =>
        response.branches
          .sort((a, b) => b.compareTo(a))
          .map((branch) =>
            SudokuGridViewModelConverter.createViewModelFromGrid(
              branch.grid,
              id,
              {
                id: branch.getId(),
                isCurrent: branch.isCurrentBranch(),
                verificationResult:
                  state !== "NOT_STARTED" && branch.isCurrentBranch()
                    ? new VerifySolution().verify(branch.grid, {
                        allowEmptyCells: false,
                        size: branch.grid.length,
                      })
                    : null,
              },
            ),
          ),
      ),
    );
  }

  getDelay(): Observable<number> {
    return this.delay.asObservable();
  }

  getExecutionState(): Observable<SolverExecution> {
    return this.execution$.asObservable();
  }

  getLastStep(): Observable<string> {
    return this.response$
      .asObservable()
      .pipe(map((response) => response.stepId));
  }

  getMaximumSteps(): Observable<number> {
    return this.maxSteps$.asObservable();
  }

  getPauseAfterStep(): Observable<Nullable<number>> {
    return this.pauseAfterStep$.asObservable();
  }

  getHighlightNumber(): Observable<Nullable<number>> {
    return this.highlightNumber$.asObservable();
  }

  getStepsExecuted(): Observable<number> {
    return this.stepsExecuted$.asObservable();
  }

  getTimeElapsed(): number {
    return this.stopWatch.timeElapsed();
  }

  canGoToNextStep(): Observable<boolean> {
    return this.execution$
      .asObservable()
      .pipe(map((e) => e === "PAUSED" || e === "NOT_STARTED"));
  }

  canRestart(): Observable<boolean> {
    return this.execution$
      .asObservable()
      .pipe(map((e) => e === "DONE" || e === "FAILED"));
  }

  canStartExecuting(): Observable<boolean> {
    return this.execution$
      .asObservable()
      .pipe(map((e) => e === "NOT_STARTED" || e === "PAUSED"));
  }

  canPauseExecuting(): Observable<boolean> {
    return this.execution$.asObservable().pipe(map((e) => e === "RUNNING"));
  }

  executeNextStep(): void {
    if (!this.stopWatch.isStarted()) {
      this.stopWatch.start();
    }

    if (this.execution$.getValue() === "NOT_STARTED") {
      this.execution$.next("PAUSED");
    }

    this.solveNextStepAndFinishIfDone();
    this.stepsExecuted$.next(this.stepsExecuted$.getValue() + 1);

    if (this.stepsExecuted$.getValue() === this.pauseAfterStep$.getValue()) {
      this.execution$.next("PAUSED");
    }

    if (
      !SolverExecutionState.isFinished(this.execution$.getValue()) &&
      this.stepsExecuted$.getValue() >= this.maxSteps$.getValue()
    ) {
      this.finishExecuting("FAILED");
    }
  }

  private solveNextStepAndFinishIfDone(): void {
    const response: SolverResponse = this.solver.solveNextStep(
      this.response$.getValue(),
    );
    this.response$.next(response);
    if (response.status === "COMPLETE") {
      this.finishExecuting("DONE");
    } else if (response.status === "FAILED") {
      this.finishExecuting("FAILED");
    }
  }

  finishExecuting(state: Extract<SolverExecution, "DONE" | "FAILED">): void {
    this.stopWatch.stop();
    this.execution$.next(state);
  }

  pauseExecuting(): void {
    this.execution$.next("PAUSED");
  }

  reset(): void {
    this.resetAllExceptSolution();
    this.response$.next(this.createInitialSolverResponse());
  }

  restart(): void {
    this.resetAllExceptSolution();
    this.setInitialPuzzle(this.initialPuzzle);
  }

  private resetAllExceptSolution(): void {
    this.execution$.next("NOT_STARTED");
    this.executionId$.next(randomUUID());
    this.stepsExecuted$.next(0);
    this.solver.reset();
    this.stopWatch.reset();
  }

  setDelay(ms: number): void {
    this.delay.next(ms);
  }

  setInitialPuzzle(puzzle: SudokuGrid): void {
    this.initialPuzzle = SudokuGridUtil.clone(puzzle);
    this.response$.next(this.createInitialSolverResponse(this.initialPuzzle));
  }

  setMaximumSteps(max: number): void {
    this.maxSteps$.next(Math.max(1, max));
  }

  setPauseAfterStep(step: Nullable<number>): void {
    this.pauseAfterStep$.next(
      step != undefined ? Math.max(0, step) : undefined,
    );
  }

  setHighlightNumber(value: Nullable<number>): void {
    this.highlightNumber$.next(value);
  }

  startExecuting(): void {
    this.execution$.next("RUNNING");
    this.scheduleNextStep();
  }

  private scheduleNextStep(): void {
    if (this.execution$.getValue() === "RUNNING") {
      this.executeNextStep();
      setTimeout(() => this.scheduleNextStep(), this.delay.getValue());
    }
  }
}
