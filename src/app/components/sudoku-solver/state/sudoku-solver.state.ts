import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export interface SudokuSolverState {
  sudoku: Nullable<SudokuGrid>;
}
