import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

/**
 * Converts empty cells into an array of possible values. The already existing values
 * per row/column/square are considered during this step - so that they are not part
 * of the possible values.
 * Only the next cell which can be converted is handled and then the solver returns.
 *
 * This step has to be executed as the first step for all empty cells - otherwise
 * there is no possible-values-array for the other algorithms to work with.
 */
export class EmptyCellsToPossibleNumbers {
  run(grid: SudokuGrid): boolean {
    return this.convertNextEmptyCellToPossibleValues(grid);
  }

  private convertNextEmptyCellToPossibleValues(grid: SudokuGrid): boolean {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
        const cell = grid[rowIndex][columnIndex];
        if (isNotArray(cell) && !isDefined(cell)) {
          grid[rowIndex][columnIndex] = this.convertEmptyCellToPossibleValues(
            grid,
            rowIndex,
            columnIndex,
          );
          return true;
        }
      }
    }
    return false;
  }

  private convertEmptyCellToPossibleValues(
    grid: SudokuGrid,
    rowIndex: number,
    columnIndex: number,
  ): number[] {
    const possibleValues: number[] = [];
    for (let possibleValue = 1; possibleValue <= grid.length; possibleValue++) {
      if (
        !SudokuGridUtil.getRowValues(grid, rowIndex).includes(possibleValue) &&
        !SudokuGridUtil.getColumnValues(grid, columnIndex).includes(
          possibleValue,
        ) &&
        !SudokuGridUtil.getSquareValues(grid, rowIndex, columnIndex).includes(
          possibleValue,
        )
      ) {
        possibleValues.push(possibleValue);
      }
    }
    return possibleValues;
  }
}
