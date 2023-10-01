import { Injectable, inject } from "@angular/core";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverStateService {
  private solver: SudokuSolverService = inject(SudokuSolverService);

  private execution$ = new BehaviorSubject<SolverExecution>("NOT_STARTED");
  private branches$ = new BehaviorSubject<SudokuGrid[]>([]);

  getBranches(): Observable<SudokuGrid[]> {
    return this.branches$.asObservable();
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
    this.branches$.next(this.solver.solveNextStep(this.branches$.getValue()));
  }

  setInitialPuzzle(puzzle: SudokuGrid): void {
    this.branches$.next([puzzle]);
  }

  startExecuting(): void {
    this.execution$.next("RUNNING");
    this.scheduleNextStep();
  }

  private scheduleNextStep(): void {
    if (this.execution$.getValue() === "RUNNING") {
      this.executeNextStep();
    }
    setTimeout(() => this.scheduleNextStep(), 0);
  }

  pauseExecuting(): void {
    this.execution$.next("PAUSED");
  }

  finishExecuting(state: Extract<SolverExecution, "DONE" | "FAILED">): void {
    this.execution$.next(state);
  }

  reset(): void {
    this.execution$.next("NOT_STARTED");
    this.branches$.next([]);
  }
}
