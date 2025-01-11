import { SudokuGrid } from "@app/types/sudoku-grid";

export interface SolverRunnable {
  run(grid: SudokuGrid): boolean;
}
