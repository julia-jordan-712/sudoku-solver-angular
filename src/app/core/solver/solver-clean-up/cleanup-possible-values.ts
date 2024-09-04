import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

/**
 * Cleans up the possible values by removing found values from the possible-values-array.
 *
 * This step has to be executed after a step which found new values - otherwise the
 * possible values do not reflect the found value.
 */
export class CleanupPossibleValues implements SolverRunnable {
  constructor(private mode: "ONLY_NEXT_CELL" | "ALL_CELLS") {}

  /**
   * @returns true is something was changed
   */
  run(grid: SudokuGrid): boolean {
    if (this.mode === "ONLY_NEXT_CELL") {
      return this.cleanupNextPossibleValue(grid);
    } else {
      let changeInLastStep = false;
      let changedSomething = false;
      do {
        changeInLastStep = this.cleanupNextPossibleValue(grid);
        changedSomething = changedSomething || changeInLastStep;
      } while (changeInLastStep);
      return changedSomething;
    }
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
