import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

/**
 * Cleans up the possible values by removing found values from the possible-values-array.
 * Only the next cell which can be cleaned up is handled and then the solver returns.
 *
 * This step has to be executed after a step which found new values - otherwise the
 * possible values do not reflect the found value.
 */
export class CleanupPossibleValues implements SolverRunnable {
  run(grid: SudokuGrid): boolean {
    return this.cleanupNextPossibleValue(grid);
  }

  private cleanupNextPossibleValue(grid: SudokuGrid): boolean {
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
