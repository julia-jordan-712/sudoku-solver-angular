import { InjectionToken } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { Observable } from "rxjs";

export const SUDOKU_SOLVER_STATE: InjectionToken<SudokuSolverState> =
  new InjectionToken<SudokuSolverState>("SUDOKU_SOLVER_STATE");

export interface SudokuSolverState {
  getCurrentBranch(): Observable<Nullable<SudokuGridViewModel>>;
  getAdditionalBranches(): Observable<SudokuGridViewModel[]>;
  getExecutionState(): Observable<SolverExecution>;

  getDelay(): Observable<number>;
  setDelay(ms: number): void;

  getLastStep(): Observable<string>;

  getBranchesRequired(): Observable<number>;
  getStepsExecuted(): Observable<number>;
  getMaximumSteps(): Observable<number>;
  setMaximumSteps(max: number): void;
  getPauseAfterStep(): Observable<Nullable<number>>;
  setPauseAfterStep(step: Nullable<number>): void;
  getHighlightNumber(): Observable<Nullable<number>>;
  setHighlightNumber(value: Nullable<number>): void;

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
}
