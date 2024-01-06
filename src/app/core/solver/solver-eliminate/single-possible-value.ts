import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";

export class SinglePossibleValue {
  run(grid: SudokuGrid): boolean {
    return this.convertSinglePossibleValues(grid);
  }

  private convertSinglePossibleValues(grid: SudokuGrid): boolean {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
        const cell = grid[rowIndex][columnIndex];
        if (isArray(cell) && cell.length === 1) {
          grid[rowIndex][columnIndex] = cell[0];
          return true;
        }
      }
    }
    return false;
  }
}