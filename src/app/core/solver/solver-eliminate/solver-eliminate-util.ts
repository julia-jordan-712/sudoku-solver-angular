import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";

export class SolverEliminateUtil {
  static findIndexOfSingleSliceContainingPossibleValue(
    slices: SudokuGridCell[][],
    v: number,
  ): number {
    let resultIndex = -1;
    for (let i = 0; i < slices.length; i++) {
      if (this.cellsIncludeValue(slices[i], v)) {
        if (resultIndex >= 0) {
          // second match => value occurs in multiple slices => return -1
          return -1;
        } else {
          // first match => save index of slice
          resultIndex = i;
        }
      }
    }
    return resultIndex;
  }

  private static cellsIncludeValue(
    cells: SudokuGridCell[],
    v: number,
  ): boolean {
    return cells.reduce(
      (acc, cell) => acc || (isArray(cell) && cell.includes(v)),
      false,
    );
  }
}
