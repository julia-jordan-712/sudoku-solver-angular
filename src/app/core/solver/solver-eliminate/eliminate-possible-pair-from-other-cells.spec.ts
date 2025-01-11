import { EliminatePossiblePairFromOtherCells } from "@app/core/solver/solver-eliminate/eliminate-possible-pair-from-other-cells";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

describe(EliminatePossiblePairFromOtherCells.name, () => {
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
        new EliminatePossiblePairFromOtherCells().run(params.grid),
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
        new EliminatePossiblePairFromOtherCells().run(params.grid),
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
      expect(new EliminatePossiblePairFromOtherCells().run(grid)).toBeTrue();
      expect(grid).toEqual(params.expected);
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
      new EliminatePossiblePairFromOtherCells().run(
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
      new EliminatePossiblePairFromOtherCells().run(
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
});
