import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { EliminatePossiblePairFromOtherCells } from "./eliminate-possible-pair-from-other-cells";

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

  it("should only handle rows, columns and squares simultaneously for the same pair of numbers if they occur in the same index", () => {
    const all = [1, 2, 3, 4];
    const onlyRowChanged = [
      [[3, 4], all, [3, 4], all],
      [all, all, all, all],
      [all, all, [3, 4], all],
      [all, all, all, [3, 4]],
    ];
    const allChanged = [
      [all, [3, 4], [3, 4], all],
      [[3, 4], all, all, all],
      [[3, 4], all, all, all],
      [all, all, all, all],
    ];

    expect(
      new EliminatePossiblePairFromOtherCells().run(onlyRowChanged),
    ).toBeTrue();
    expect(onlyRowChanged).toEqual([
      [
        [3, 4],
        [1, 2],
        [3, 4],
        [1, 2],
      ],
      [all, all, all, all],
      [all, all, [3, 4], all],
      [all, all, all, [3, 4]],
    ]);

    expect(
      new EliminatePossiblePairFromOtherCells().run(allChanged),
    ).toBeTrue();
    expect(allChanged).toEqual([
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
