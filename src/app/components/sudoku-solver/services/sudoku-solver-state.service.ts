import { Injectable } from "@angular/core";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverStateService {
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
    // TODO implement
  }

  setInitialPuzzle(puzzle: SudokuGrid): void {
    this.branches$.next([puzzle]);
  }

  startExecuting(): void {
    this.execution$.next("RUNNING");
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
