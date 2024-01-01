/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Provider } from "@angular/core";
import {
  SUDOKU_SOLVER_STATE,
  SudokuSolverState,
} from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { EMPTY, Observable } from "rxjs";

@Injectable()
export class SudokuSolverStateMockService implements SudokuSolverState {
  getBranches(): Observable<SudokuGrid[]> {
    return EMPTY;
  }
  getExecutionState(): Observable<SolverExecution> {
    return EMPTY;
  }
  getDelay(): Observable<number> {
    return EMPTY;
  }
  setDelay(ms: number): void {
    // do nothing
  }
  getLastStep(): Observable<string> {
    return EMPTY;
  }
  getStepsExecuted(): Observable<number> {
    return EMPTY;
  }
  getMaximumSteps(): Observable<number> {
    return EMPTY;
  }
  setMaximumSteps(max: number): void {
    // do nothing
  }
  getTimeElapsed(): number {
    return -1;
  }
  setInitialPuzzle(puzzle: SudokuGrid): void {
    // do nothing
  }
  canStartExecuting(): Observable<boolean> {
    return EMPTY;
  }
  canPauseExecuting(): Observable<boolean> {
    return EMPTY;
  }
  canGoToNextStep(): Observable<boolean> {
    return EMPTY;
  }
  executeNextStep(): void {
    // do nothing
  }
  startExecuting(): void {
    // do nothing
  }
  pauseExecuting(): void {
    // do nothing
  }
  finishExecuting(state: "DONE" | "FAILED"): void {
    // do nothing
  }
  reset(): void {
    // do nothing
  }
  canRestart(): Observable<boolean> {
    return EMPTY;
  }
  restart(): void {
    // do nothing
  }
  getVerificationResults(): Observable<Nullable<VerificationResult[]>> {
    return EMPTY;
  }
}

export const SUDOKU_SOLVER_STATE_MOCK_PROVIDER: Provider[] = [
  {
    provide: SudokuSolverStateMockService,
    useClass: SudokuSolverStateMockService,
  },
  {
    provide: SUDOKU_SOLVER_STATE,
    useExisting: SudokuSolverStateMockService,
  },
];
