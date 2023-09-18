import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/shared/types/sudoku-grid";

export class SudokuGridUtil {
  static clone(grid: SudokuGrid): SudokuGrid {
    const result: SudokuGrid = [];
    grid.forEach((row) => {
      const newRow: SudokuGridRow = [];
      row.forEach((cell: SudokuGridCell) => newRow.push(cell));
      result.push(newRow);
    });
    return result;
  }
}
