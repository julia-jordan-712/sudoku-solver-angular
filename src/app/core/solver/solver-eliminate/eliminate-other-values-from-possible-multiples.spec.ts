import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";
import { EliminateOtherValuesFromPossibleMultiples } from "./eliminate-other-values-from-possible-multiples";

describe(EliminateOtherValuesFromPossibleMultiples.name, () => {
  [
    {
      input: [
        [3, 4, 1, 2],
        [[1, 2, 3, 4], [3, 4], [1, 2, 3], [4]],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
      expected: [
        [3, 4, 1, 2],
        [[1, 2], [3, 4], [1, 2], [4]],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
    {
      input: [
        [[3, 4], 4, 1, 2],
        [[1, 2, 3], 2, 3, 4],
        [[1, 2, 4], 3, 4, 1],
        [1, 1, 2, 3],
      ],
      expected: [
        [[3, 4], 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [1, 1, 2, 3],
      ],
    },
    {
      input: [
        [[3, 4], [4], 1, 2],
        [[1, 2, 3, 4], [1, 2, 4], 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
      expected: [
        [[3, 4], [4], 1, 2],
        [[1, 2], [1, 2], 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
  ].forEach((params) => {
    it(`should remove the other possible values from the cells of the pair: ${JSON.stringify(
      params.input,
    )}`, () => {
      const grid = SudokuGridUtil.clone(params.input);
      expect(
        new EliminateOtherValuesFromPossibleMultiples().run(grid),
      ).toBeTrue();
      expect(grid)
        .withContext(toErrorMessage(params.expected, grid))
        .toEqual(params.expected);
    });
  });

  it("should handle rows, columns and squares simultaneously for the same pair of numbers", () => {
    const all = [1, 2, 3, 4];
    const firstRowThirdColumSecondSquareFourthSquare_pair13 = [
      [[1, 2, 3], [3], [1, 2, 4], [4]],
      [all, all, [4], all],
      [all, all, [1, 2, 3], [4]],
      [all, all, [3], [1, 2, 4]],
    ];
    const firstRowFirstColumnFirstSquare_pair13 = [
      [[2], [1, 2, 3], [1, 3, 4], [4]],
      [[1, 3, 4], [2, 4], all, all],
      [[1, 2, 3], all, all, all],
      [[4], all, all, all],
    ];

    expect(
      new EliminateOtherValuesFromPossibleMultiples().run(
        firstRowThirdColumSecondSquareFourthSquare_pair13,
      ),
    ).toBeTrue();
    const firstRowThirdColumSecondSquareFourthSquare_pair13_expected = [
      [[1, 2], [3], [1, 2], [4]],
      [all, all, [4], [1, 2]],
      [all, all, [1, 2], [4]],
      [all, all, [3], [1, 2]],
    ];
    expect(firstRowThirdColumSecondSquareFourthSquare_pair13)
      .withContext(
        toErrorMessage(
          firstRowThirdColumSecondSquareFourthSquare_pair13_expected,
          firstRowThirdColumSecondSquareFourthSquare_pair13,
        ),
      )
      .toEqual(firstRowThirdColumSecondSquareFourthSquare_pair13_expected);

    expect(
      new EliminateOtherValuesFromPossibleMultiples().run(
        firstRowFirstColumnFirstSquare_pair13,
      ),
    ).toBeTrue();
    const firstRowFirstColumnFirstSquare_pair13_expected = [
      [[2], [1, 3], [1, 3], [4]],
      [[1, 3], [2, 4], all, all],
      [[1, 3], all, all, all],
      [[4], all, all, all],
    ];
    expect(firstRowFirstColumnFirstSquare_pair13)
      .withContext(
        toErrorMessage(
          firstRowFirstColumnFirstSquare_pair13_expected,
          firstRowFirstColumnFirstSquare_pair13,
        ),
      )
      .toEqual(firstRowFirstColumnFirstSquare_pair13_expected);
  });

  it("should find pair [1,2] in row 6", () => {
    const sudoku: SudokuGrid = [
      [[2, 4], 7, [2, 3, 4], 5, [3, 4], 1, 8, 6, 9],
      [8, [3, 5], 9, 6, [3, 4], 2, [3, 4, 5], 1, 7],
      [1, 6, [3, 4, 5], 9, 8, 7, [2, 3, 4, 5], [3, 4, 5], [2, 4, 5]],
      [3, [1, 5, 9], 8, 7, 2, 6, [1, 4, 5], [4, 5, 9], [4, 5]],
      [[4, 5, 9], [2, 5, 9], 7, 3, 1, [4, 9], 6, 8, [2, 5]],
      [[4, 6, 9], [1, 2, 9], [4, 6], 8, 5, [4, 9], [1, 2, 7], [7, 9], 3],
      [[5, 6, 9], [3, 5, 9], [3, 5, 6], 4, 7, 8, [3, 5], 2, 1],
      [[2, 7], 4, [1, 2, 3], [1, 2], 6, 5, 9, [3, 7], 8],
      [[2, 5, 7], 8, [1, 2, 5], [1, 2], 9, 3, [4, 5, 7], [4, 5, 7], 6],
    ];
    new EliminateOtherValuesFromPossibleMultiples().run(sudoku);

    // in row 6 the values 1 and 2 appear only in columns 2 and 7
    // expect: all other possible values in these cells are removed
    expect(sudoku[5]).toEqual([
      [4, 6, 9],
      [1, 2],
      [4, 6],
      8,
      5,
      [4, 9],
      [1, 2],
      [7, 9],
      3,
    ]);
  });

  it("should work also for multiples > pairs", () => {
    const sudoku: SudokuGrid = [
      [[2, 6, 7, 9], 4, [6, 9], 3, [2, 6], 8, 5, [1, 2, 6, 7, 9], [1, 2, 6, 9]],
      [
        [2, 3, 6, 7, 9],
        [2, 3, 5, 7, 9],
        [3, 5, 6, 9],
        [1, 2, 6],
        4,
        [1, 2, 6],
        [2, 6, 7],
        8,
        [1, 2, 6, 9],
      ],
      [[2, 6, 8], 1, [6, 8], 5, 7, 9, 4, [2, 6], 3],
      [5, [7, 8], 2, [1, 4, 6, 7, 8], 9, [1, 4, 6, 7], 3, [4, 6], [4, 6, 8]],
      [
        [3, 6, 7, 8, 9],
        [3, 7, 8, 9],
        4,
        [2, 6, 7, 8],
        [3, 5],
        [2, 6, 7],
        1,
        [2, 5, 6],
        [2, 5, 6, 8],
      ],
      [
        1,
        [3, 8],
        [3, 6, 8],
        [2, 4, 6, 8],
        [3, 5],
        [2, 4, 6],
        9,
        [2, 4, 5, 6],
        7,
      ],
      [4, [2, 8], 7, 9, 1, 5, [2, 6, 8], 3, [2, 6, 8]],
      [
        [2, 3, 9],
        6,
        [3, 5, 9],
        [2, 4, 7],
        8,
        [2, 4, 7],
        [2, 7],
        [1, 2, 4, 5, 7, 9],
        [1, 2, 4, 5, 9],
      ],
      [
        [2, 8, 9],
        [2, 5, 8, 9],
        1,
        [2, 4, 6, 7],
        [2, 6],
        3,
        [2, 6, 7, 8],
        [2, 4, 5, 6, 7, 9],
        [2, 4, 5, 6, 8, 9],
      ],
    ];
    new EliminateOtherValuesFromPossibleMultiples().run(sudoku);

    // In the 8th column the values [1,7,9] are possible in the 1st, 8th and 9th row - and nowhere else.
    // So the other values can be removed from these cells.
    const expected = [
      [[2, 6, 7, 9], 4, [6, 9], 3, [2, 6], 8, 5, [1, 7, 9], [1, 2, 6, 9]],
      [
        [2, 3, 6, 7, 9],
        [2, 3, 5, 7, 9],
        [3, 5, 6, 9],
        [1, 2, 6],
        4,
        [1, 2, 6],
        [2, 6, 7],
        8,
        [1, 2, 6, 9],
      ],
      [[2, 6, 8], 1, [6, 8], 5, 7, 9, 4, [2, 6], 3],
      [5, [7, 8], 2, [1, 4, 6, 7, 8], 9, [1, 4, 6, 7], 3, [4, 6], [4, 6, 8]],
      [
        [3, 6, 7, 8, 9],
        [3, 7, 8, 9],
        4,
        [2, 6, 7, 8],
        [3, 5],
        [2, 6, 7],
        1,
        [2, 5, 6],
        [2, 5, 6, 8],
      ],
      [
        1,
        [3, 8],
        [3, 6, 8],
        [2, 4, 6, 8],
        [3, 5],
        [2, 4, 6],
        9,
        [2, 4, 5, 6],
        7,
      ],
      [4, [2, 8], 7, 9, 1, 5, [2, 6, 8], 3, [2, 6, 8]],
      [
        [2, 3, 9],
        6,
        [3, 5, 9],
        [2, 4, 7],
        8,
        [2, 4, 7],
        [2, 7],
        [1, 7, 9],
        [1, 2, 4, 5, 9],
      ],
      [
        [2, 8, 9],
        [2, 5, 8, 9],
        1,
        [2, 4, 6, 7],
        [2, 6],
        3,
        [2, 6, 7, 8],
        [7, 9],
        [2, 4, 5, 6, 8, 9],
      ],
    ];
    expect(sudoku)
      .withContext(toErrorMessage(expected, sudoku))
      .toEqual(expected);
  });

  function toErrorMessage(expected: SudokuGrid, result: SudokuGrid): string {
    return `Expected ${SudokuGridUtil.toString(expected)} but got ${SudokuGridUtil.toString(result)}`;
  }
});
