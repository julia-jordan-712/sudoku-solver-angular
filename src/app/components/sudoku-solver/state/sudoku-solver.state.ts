import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export interface SudokuSolverStateExecutionInfo {
  /** Id for the current run of the solver */
  id: string;
  /** maximum steps to be executed to prevent endless loops */
  maxSteps: number;
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

export interface SudokuSolverStateViewInfo {
  /** total amount of branches that were opened since the solver started */
  amountOfBranches: number;
  /** delay in milliseconds between solver steps */
  delay: number;
  /** the number to be highlighted in the Sudoku to be solved */
  highlightNumber: Nullable<number>;
  /** the solver is to be paused when this step is reached */
  pauseAfterStep: Nullable<number>;
}

export interface SudokuSolverState {
  executionInfo: SudokuSolverStateExecutionInfo;
  puzzle: Nullable<SudokuGrid>;
  response: SolverResponse;
  viewInfo: SudokuSolverStateViewInfo;
}
