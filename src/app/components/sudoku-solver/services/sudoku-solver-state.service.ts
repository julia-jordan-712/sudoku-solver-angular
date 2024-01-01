import { Injectable, inject } from "@angular/core";
import { SudokuSolverState } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SolverResponse } from "@app/core/solver/solver-response";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable()
export class SudokuSolverStateService implements SudokuSolverState {
  private solver: SudokuSolverService = inject(SudokuSolverService);
  private verify: VerifySolutionService = inject(VerifySolutionService);

  private delay = new BehaviorSubject<number>(0);
  private execution$ = new BehaviorSubject<SolverExecution>("NOT_STARTED");
  private initialPuzzle: SudokuGrid = [];
  private maxSteps$ = new BehaviorSubject<number>(10_000);
  private response$ = new BehaviorSubject<SolverResponse>(
    this.createInitialSolverResponse(),
  );
  private stepsExecuted$ = new BehaviorSubject<number>(0);
  private verificationResults$ = new BehaviorSubject<
    Nullable<VerificationResult[]>
  >(undefined);

  private createInitialSolverResponse(): SolverResponse {
    return { branches: [], status: "UNKNOWN", stepId: "" };
  }

  private stopWatch: StopWatch = new StopWatch();

  getBranches(): Observable<SudokuGrid[]> {
    return this.response$
      .asObservable()
      .pipe(map((response) => response.branches));
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

  getStepsExecuted(): Observable<number> {
    return this.stepsExecuted$.asObservable();
  }

  getTimeElapsed(): number {
    return this.stopWatch.timeElapsed();
  }

  getVerificationResults(): Observable<Nullable<VerificationResult[]>> {
    return this.verificationResults$.asObservable();
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
    if (this.stepsExecuted$.getValue() >= this.maxSteps$.getValue()) {
      this.finishExecuting("FAILED");
      return;
    }
    if (!this.stopWatch.isStarted()) {
      this.stopWatch.start();
    }
    if (this.execution$.getValue() === "NOT_STARTED") {
      this.execution$.next("PAUSED");
    }
    this.verificationResults$.next(undefined);
    this.response$.next(
      this.solver.solveNextStep(this.getResponseBranches(), this),
    );
    this.stepsExecuted$.next(this.stepsExecuted$.getValue() + 1);
  }

  private getResponseBranches(): SudokuGrid[] {
    return this.response$.getValue().branches;
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
    this.verificationResults$.next(undefined);
    this.stepsExecuted$.next(0);
    this.solver.reset();
    this.stopWatch.reset();
  }

  setDelay(ms: number): void {
    this.delay.next(ms);
  }

  setInitialPuzzle(puzzle: SudokuGrid): void {
    this.initialPuzzle = SudokuGridUtil.clone(puzzle);
    this.response$.next({
      ...this.createInitialSolverResponse(),
      branches: [SudokuGridUtil.clone(puzzle)],
    });
  }

  setMaximumSteps(max: number): void {
    this.maxSteps$.next(Math.max(0, max));
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

  updateVerificationResults(): void {
    this.verificationResults$.next(
      this.getResponseBranches().map((grid) => this.verify.verify(grid)),
    );
  }
}
