import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export interface SolverRunnable {
  run(grid: SudokuGrid): boolean;
}
