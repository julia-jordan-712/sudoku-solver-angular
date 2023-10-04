import { Injectable, inject } from "@angular/core";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverStateService {
  private solver: SudokuSolverService = inject(SudokuSolverService);
  private verify: VerifySolutionService = inject(VerifySolutionService);

  private branches$ = new BehaviorSubject<SudokuGrid[]>([]);
  private execution$ = new BehaviorSubject<SolverExecution>("NOT_STARTED");
  private maxSteps$ = new BehaviorSubject<number>(10_000);
  private stepsExecuted$ = new BehaviorSubject<number>(0);
  private verificationResults$ = new BehaviorSubject<
    Nullable<VerificationResult[]>
  >(undefined);

  getBranches(): Observable<SudokuGrid[]> {
    return this.branches$.asObservable();
  }

  getExecutionState(): Observable<SolverExecution> {
    return this.execution$.asObservable();
  }

  getMaximumSteps(): Observable<number> {
    return this.maxSteps$.asObservable();
  }

  getStepsExecuted(): Observable<number> {
    return this.stepsExecuted$.asObservable();
  }

  getVerificationResults(): Observable<Nullable<VerificationResult[]>> {
    return this.verificationResults$.asObservable();
  }

  canGoToNextStep(): Observable<boolean> {
    return this.execution$.asObservable().pipe(map((e) => e === "PAUSED"));
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
    this.verificationResults$.next(undefined);
    this.branches$.next(
      this.solver.solveNextStep(this.branches$.getValue(), this),
    );
    this.stepsExecuted$.next(this.stepsExecuted$.getValue() + 1);
  }

  finishExecuting(state: Extract<SolverExecution, "DONE" | "FAILED">): void {
    this.execution$.next(state);
    if (state === "DONE") {
      this.updateVerificationResults();
    }
  }

  pauseExecuting(): void {
    this.execution$.next("PAUSED");
  }

  reset(): void {
    this.execution$.next("NOT_STARTED");
    this.branches$.next([]);
    this.stepsExecuted$.next(0);
  }

  setInitialPuzzle(puzzle: SudokuGrid): void {
    this.branches$.next([SudokuGridUtil.clone(puzzle)]);
  }

  setMaxSteps(max: number): void {
    this.maxSteps$.next(Math.max(0, max));
  }

  startExecuting(): void {
    this.execution$.next("RUNNING");
    this.scheduleNextStep();
  }

  private scheduleNextStep(): void {
    if (this.stepsExecuted$.getValue() >= this.maxSteps$.getValue()) {
      this.execution$.next("FAILED");
    }
    if (this.execution$.getValue() === "RUNNING") {
      this.executeNextStep();
      setTimeout(() => this.scheduleNextStep(), 0);
    }
  }

  updateVerificationResults(): void {
    this.verificationResults$.next(
      this.branches$.getValue().map((grid) => this.verify.verify(grid)),
    );
  }
}
