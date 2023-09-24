import { Injectable } from "@angular/core";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SudokuSolverStateService {
  private execution$ = new BehaviorSubject<SolverExecution>("NOT_STARTED");

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

  startExecuting(): void {
    this.execution$.next("RUNNING");
  }

  pauseExecuting(): void {
    this.execution$.next("PAUSED");
  }

  finishExecuting(state: Extract<SolverExecution, "DONE" | "FAILED">): void {
    this.execution$.next(state);
  }
}
