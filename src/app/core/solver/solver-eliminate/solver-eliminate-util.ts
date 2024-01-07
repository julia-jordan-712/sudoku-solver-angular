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

  static commonTestData(): {
    title: string;
    input: (number | number[])[][];
    expected: (number | number[])[][];
    changed: boolean;
  }[] {
    const all = [1, 2, 3, 4];

    return [
      {
        title:
          "should remove 3 from second row in second square if only 1 and 2 are available in first row of first square",
        input: [
          [[1, 2], [1, 2], all, all],
          [all, all, all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [[1, 2], [1, 2], all, all],
          [all, all, [1, 2, 4], [1, 2, 4]],
          [all, all, all, all],
          [all, all, all, all],
        ],
        changed: true,
      },
      {
        title:
          "should remove 1 from second row in first square if it is not available in first row of second square",
        input: [
          [all, all, [2, 3], [3, 4]],
          [all, all, all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [all, all, [2, 3], [3, 4]],
          [[2, 3, 4], [2, 3, 4], all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        changed: true,
      },
      {
        title:
          "should remove 3 from first row in second square if only 1 and 2 are available in second row of first square",
        input: [
          [all, all, all, all],
          [[1, 2], [1, 2], all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [all, all, [1, 2, 4], [1, 2, 4]],
          [[1, 2], [1, 2], all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        changed: true,
      },
      {
        title:
          "should remove 1 from first row in first square if it is not available in second row of second square",
        input: [
          [all, all, all, all],
          [all, all, [2, 3], [3, 4]],
          [all, all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [[2, 3, 4], [2, 3, 4], all, all],
          [all, all, [2, 3], [3, 4]],
          [all, all, all, all],
          [all, all, all, all],
        ],
        changed: true,
      },
      {
        title:
          "should remove 3 from second column in third square if only 1,2,4 are available in first column of first square",
        input: [
          [[1, 2], all, all, all],
          [[1, 4], all, all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [[1, 2], all, all, all],
          [[1, 4], all, all, all],
          [all, [1, 2, 4], all, all],
          [all, [1, 2, 4], all, all],
        ],
        changed: true,
      },
      {
        title:
          "should remove 4 from third column in second square if only 1,2,3 are available in second column of fourth square",
        input: [
          [all, all, all, all],
          [all, all, all, all],
          [all, all, all, [1, 2, 3]],
          [all, all, all, [1]],
        ],
        expected: [
          [all, all, [1, 2, 3], all],
          [all, all, [1, 2, 3], all],
          [all, all, all, [1, 2, 3]],
          [all, all, all, [1]],
        ],
        changed: true,
      },
      {
        title:
          "should not remove value from squares if it is possible in same row of multiple squares",
        input: [
          [all, [1, 2], [1, 2], all],
          [all, all, all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [all, [1, 2], [1, 2], all],
          [all, all, all, all],
          [all, all, all, all],
          [all, all, all, all],
        ],
        changed: false,
      },
      {
        title:
          "should not remove value from squares if it is possible in same column of multiple squares",
        input: [
          [all, all, all, all],
          [[1, 2, 3], all, all, all],
          [[1, 3], all, all, all],
          [all, all, all, all],
        ],
        expected: [
          [all, all, all, all],
          [[1, 2, 3], all, all, all],
          [[1, 3], all, all, all],
          [all, all, all, all],
        ],
        changed: false,
      },
    ];
  }
}
