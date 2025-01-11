import { SudokuGrid } from "@app/types/sudoku-grid";

export interface TestPuzzle {
  puzzle: SudokuGrid;
  solution: number[][];
}
