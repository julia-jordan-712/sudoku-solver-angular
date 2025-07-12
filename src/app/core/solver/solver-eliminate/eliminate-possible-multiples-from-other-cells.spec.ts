import { EliminatePossibleMultiplesFromOtherCells } from "@app/core/solver/solver-eliminate/eliminate-possible-multiples-from-other-cells";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";

describe(EliminatePossibleMultiplesFromOtherCells.name, () => {
  [
    {
      text: "row",
      grid: [
        [3, 4, 1, 2],
        [[1, 3], 2, [1, 3], 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
    {
      text: "column",
      grid: [
        [3, 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
    {
      text: "square",
      grid: [
        [3, [1, 4], 1, 2],
        [[1, 4], 2, 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
  ].forEach((params) => {
    it(`should not do anything if the values of the pair do not appear again in a ${params.text}`, () => {
      expect(
        new EliminatePossibleMultiplesFromOtherCells().run(params.grid),
      ).toBeFalse();
    });
  });

  [
    {
      text: "row",
      grid: [
        [3, 4, 1, 2],
        [[1, 3], 1, [1, 3], 3],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
    {
      text: "column",
      grid: [
        [2, 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [1, 1, 2, 3],
      ],
    },
    {
      text: "square",
      grid: [
        [[1, 2], 2, 1, 2],
        [1, [1, 2], 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
  ].forEach((params) => {
    it(`should not remove already set values in a ${params.text}`, () => {
      expect(
        new EliminatePossibleMultiplesFromOtherCells().run(params.grid),
      ).toBeFalse();
    });
  });

  [
    {
      input: [
        [3, 4, 1, 2],
        [
          [1, 2],
          [1, 3, 4],
          [1, 2],
          [2, 4],
        ],
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
        [3, 4, 1, 2],
        [
          [1, 2],
          [1, 2, 3, 4],
          [1, 2],
          [2, 4],
        ],
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
        [[2, 4], 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [1, 1, 2, 3],
      ],
      expected: [
        [[4], 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [1, 1, 2, 3],
      ],
    },
    {
      input: [
        [[1, 2, 4], 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [1, 1, 2, 3],
      ],
      expected: [
        [[4], 4, 1, 2],
        [[1, 2], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [1, 1, 2, 3],
      ],
    },
    {
      input: [
        [[1, 3, 4], [1, 4], 1, 2],
        [[1, 2], [1, 2], 3, 4],
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
    {
      input: [
        [[1, 3, 4], [1, 2], 1, 2],
        [[1, 2], [1, 2, 3], 4, 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
      expected: [
        [[3, 4], [1, 2], 1, 2],
        [[1, 2], [3], 4, 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
  ].forEach((params) => {
    it(`should remove the values of the pair from the other possible values: ${JSON.stringify(
      params.input,
    )}`, () => {
      const grid = SudokuGridUtil.clone(params.input);
      expect(
        new EliminatePossibleMultiplesFromOtherCells().run(grid),
      ).toBeTrue();
      expect(grid)
        .withContext(toErrorMessage(params.expected, grid))
        .toEqual(params.expected);
    });
  });

  it("should handle rows, columns and squares simultaneously for the same pair of numbers", () => {
    const all = [1, 2, 3, 4];
    const firstRowThirdColumnFourthSquare_pair34 = [
      [[3, 4], all, [3, 4], all],
      [all, all, all, all],
      [all, all, [3, 4], all],
      [all, all, all, [3, 4]],
    ];
    const firstRowFirstColumnFirstSquare_pair34 = [
      [all, [3, 4], [3, 4], all],
      [[3, 4], all, all, all],
      [[3, 4], all, all, all],
      [all, all, all, all],
    ];

    expect(
      new EliminatePossibleMultiplesFromOtherCells().run(
        firstRowThirdColumnFourthSquare_pair34,
      ),
    ).toBeTrue();
    expect(firstRowThirdColumnFourthSquare_pair34).toEqual([
      [
        [3, 4],
        [1, 2],
        [3, 4],
        [1, 2],
      ],
      [all, all, [1, 2], all],
      [all, all, [3, 4], [1, 2]],
      [all, all, [1, 2], [3, 4]],
    ]);

    expect(
      new EliminatePossibleMultiplesFromOtherCells().run(
        firstRowFirstColumnFirstSquare_pair34,
      ),
    ).toBeTrue();
    expect(firstRowFirstColumnFirstSquare_pair34).toEqual([
      [
        [1, 2],
        [3, 4],
        [3, 4],
        [1, 2],
      ],
      [[3, 4], [1, 2], all, all],
      [[3, 4], all, all, all],
      [[1, 2], all, all, all],
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
    expect(
      new EliminatePossibleMultiplesFromOtherCells().run(sudoku),
    ).toBeTrue();

    // In the 8th row in the 4th, 6th and 7th column only the values [2,4,7] are possible - and no other.
    // So these values can be removed from other possible values in the 8th row.
    const expected = [
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
        [3, 9],
        6,
        [3, 5, 9],
        [2, 4, 7],
        8,
        [2, 4, 7],
        [2, 7],
        [1, 5, 9],
        [1, 5, 9],
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
    expect(sudoku)
      .withContext(toErrorMessage(expected, sudoku))
      .toEqual(expected);
  });

  function toErrorMessage(expected: SudokuGrid, result: SudokuGrid): string {
    return `Expected ${SudokuGridUtil.toString(expected)} but got ${SudokuGridUtil.toString(result)}`;
  }
});
