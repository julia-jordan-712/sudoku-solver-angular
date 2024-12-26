import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";

export function isSudoku(value: any): value is SudokuGrid {
  const grid: SudokuGrid = value as SudokuGrid;
  if (isArray(grid)) {
    if (isArray(grid[0])) {
      const rowLength = grid[0].length;
      for (const row of grid) {
        if (!isArray(row) || row.length !== rowLength) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
