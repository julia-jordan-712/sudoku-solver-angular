import { InjectionToken } from "@angular/core";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Observable } from "rxjs";

export const SUDOKU_SOLVER_STATE: InjectionToken<SudokuSolverState> =
  new InjectionToken<SudokuSolverState>("SUDOKU_SOLVER_STATE");

export interface SudokuSolverState {
  getBranches(): Observable<SudokuGrid[]>;
  getExecutionState(): Observable<SolverExecution>;

  getDelay(): Observable<number>;
  setDelay(ms: number): void;

  getLastStep(): Observable<string>;

  getStepsExecuted(): Observable<number>;
  getMaximumSteps(): Observable<number>;
  setMaximumSteps(max: number): void;

  getTimeElapsed(): number;

  setInitialPuzzle(puzzle: SudokuGrid): void;

  canStartExecuting(): Observable<boolean>;

  canPauseExecuting(): Observable<boolean>;
  canGoToNextStep(): Observable<boolean>;

  executeNextStep(): void;

  startExecuting(): void;
  pauseExecuting(): void;
  finishExecuting(state: Extract<SolverExecution, "DONE" | "FAILED">): void;

  reset(): void;

  canRestart(): Observable<boolean>;
  restart(): void;

  getVerificationResults(): Observable<Nullable<VerificationResult[]>>;
}
