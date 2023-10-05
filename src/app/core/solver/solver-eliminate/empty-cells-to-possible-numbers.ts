import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

export class EmptyCellsToPossibleNumbers {
  run(grid: SudokuGrid): boolean {
    return this.convertEmptyCellsToPossibleValues(grid);
  }

  private convertEmptyCellsToPossibleValues(grid: SudokuGrid): boolean {
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
