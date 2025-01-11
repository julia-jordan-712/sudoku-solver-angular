import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { isArray } from "@app/util/is-array";

/**
 * Converts a cell where only one value remains in the array of possible values into a *found* value.
 *
 * This step should be executed regularly after steps which potentially eliminate possible values.
 */
export class ConvertSinglePossibleValue implements SolverRunnable {
  constructor(private mode: "ONLY_NEXT_CELL" | "ALL_CELLS") {}

  /**
   * @returns true is something was changed
   */
  run(grid: SudokuGrid): boolean {
    if (this.mode === "ONLY_NEXT_CELL") {
      return this.convertNextSinglePossibleValue(grid);
    } else {
      let changeInLastStep = false;
      let changedSomething = false;
      do {
        changeInLastStep = this.convertNextSinglePossibleValue(grid);
        changedSomething = changedSomething || changeInLastStep;
      } while (changeInLastStep);
      return changedSomething;
    }
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
