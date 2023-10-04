import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export interface SolverResponse {
  branches: SudokuGrid[];
  status: "COMPLETE" | "INCOMPLETE" | "FAILED";
}
