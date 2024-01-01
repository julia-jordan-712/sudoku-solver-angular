import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export type SolverResponseStatus =
  | "COMPLETE"
  | "INCOMPLETE"
  | "FAILED"
  | "UNKNOWN";

export interface SolverResponse {
  branches: SudokuGrid[];
  stepId: string;
  status: SolverResponseStatus;
}

export interface SolverStepResponse {
  branches: SolverResponse["branches"];
  stepId: SolverResponse["stepId"];
  failed: boolean;
}
