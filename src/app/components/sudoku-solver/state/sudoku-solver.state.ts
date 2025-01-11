import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/types/nullable";
import { SolverExecution } from "@app/types/solver-execution";
import { SudokuGrid } from "@app/types/sudoku-grid";

export interface SudokuSolverStateExecutionInfo {
  /** Id for the current run of the solver */
  id: string;
  /** total amount of branches that were opened during the current run */
  amountOfBranches: number;
  /** current status of running the solver */
  status: SolverExecution;
  /** steps which were executed so far during this run */
  stepsExecuted: number;
  /** information on the time required for the current run */
  time: {
    /** timestamp of the start of the current run */
    started: number | null;
    /** timestamp of the end of the current run */
    stopped: number | null;
    /** timestamp of the end of the last step */
    lastStep: number | null;
  };
}

export interface SudokuSolverStateSettings {
  /** delay in milliseconds between solver steps */
  delay: number;
  /** the number to be highlighted in the Sudoku to be solved */
  highlightNumber: Nullable<number>;
  /** maximum steps to be executed to prevent endless loops */
  maxSteps: number;
  /** the solver is to be paused when this step is reached */
  pauseAfterStep: Nullable<number>;
}

export const SudokuSolverStateKey = "sudokuSolver";

export interface SudokuSolverState {
  show: boolean;
  executionInfo: SudokuSolverStateExecutionInfo;
  puzzle: Nullable<SudokuGrid>;
  response: SolverResponse;
  settings: SudokuSolverStateSettings;
  previousCurrentGrid: Nullable<SudokuGrid>;
}
