import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";

/**
 * Converts a cell where only one value remains in the array of possible values into a *found* value.
 * Only the next cell which can be converted is handled and then the solver returns.
 *
 * This step should be executed regularly after steps which potentially eliminate possible values.
 */
export class SinglePossibleValue {
  run(grid: SudokuGrid): boolean {
    return this.convertNextSinglePossibleValue(grid);
  }

  private convertNextSinglePossibleValue(grid: SudokuGrid): boolean {
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
