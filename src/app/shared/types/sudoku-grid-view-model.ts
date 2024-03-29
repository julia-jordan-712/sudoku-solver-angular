import { SudokuGridCell } from "@app/shared/types/sudoku-grid";

export interface SudokuGridViewModel {
  id: string;
  rows: SudokuGridRowViewModel[];
}

export interface SudokuGridRowViewModel {
  id: string;
  cells: SudokuGridCellViewModel[];
}

export interface SudokuGridCellViewModel {
  id: string;
  cell: SudokuGridCell;
}
