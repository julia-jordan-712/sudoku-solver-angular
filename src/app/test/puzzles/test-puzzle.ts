import { SudokuGrid } from '@app/shared/types/sudoku-grid';

export interface TestPuzzle {
  puzzle: SudokuGrid;
  solution: number[][];
}
