import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export interface SolverResponse {
  branches: SudokuGrid[];
  stepId: string;
  status: "COMPLETE" | "INCOMPLETE" | "FAILED" | "UNKNOWN";
}

export interface SolverStepResponse {
  branches: SolverResponse["branches"];
  stepId: SolverResponse["stepId"];
  failed: boolean;
}
