import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

export class CleanupPossibleNumbers {
  run(grid: SudokuGrid): boolean {
    return this.cleanupPossibleValues(grid);
  }

  private cleanupPossibleValues(grid: SudokuGrid): boolean {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
        const cell = grid[rowIndex][columnIndex];
        if (isArray(cell)) {
          const valuesInUse: number[] = [
            ...SudokuGridUtil.getRowValues(grid, rowIndex),
            ...SudokuGridUtil.getColumnValues(grid, columnIndex),
            ...SudokuGridUtil.getSquareValues(grid, rowIndex, columnIndex),
          ];
          const newPossibleValues: number[] = cell.filter(
            (v) => !valuesInUse.includes(v),
          );
          grid[rowIndex][columnIndex] = newPossibleValues;
          const changedSomething = cell.length !== newPossibleValues.length;
          if (changedSomething) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
