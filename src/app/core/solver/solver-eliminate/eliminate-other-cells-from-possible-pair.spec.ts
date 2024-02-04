import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { EliminateOtherCellsFromPossiblePair } from "./eliminate-other-cells-from-possible-pair";

describe(EliminateOtherCellsFromPossiblePair.name, () => {
  [
    {
      text: "row",
      grid: [
        [3, [4], 1, 2],
        [[1, 3, 4], [1, 4], [1, 3], 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
    {
      text: "column",
      grid: [
        [[1], 4, 1, 2],
        [[1, 2, 3], 2, 3, 4],
        [[1, 2], 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
    {
      text: "square",
      grid: [
        [3, [1, 2, 4], 1, 2],
        [[1, 4], [4], 3, 4],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ],
    },
  ].forEach((params) => {
    it(`should not do anything if the values also appear in other cells of a ${params.text}`, () => {
      const grid = SudokuGridUtil.clone(params.grid);
      expect(new EliminateOtherCellsFromPossiblePair().run(grid)).toBeFalse();
      expect(grid).toEqual(params.grid);
    });
  });

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
      expect(new EliminateOtherCellsFromPossiblePair().run(grid)).toBeTrue();
      expect(grid).toEqual(params.expected);
    });
  });

  it("should only handle rows, columns and squares simultaneously for the same pair of numbers if they occur in the same index", () => {
    const all = [1, 2, 3, 4];
    const onlyRowChanged = [
      [[1, 2, 3], [2], [1, 3, 4], [4]],
      [all, all, [4], all],
      [all, all, [1, 2, 3], [4]],
      [all, all, [2], [1, 3, 4]],
    ];
    const allChanged = [
      [[2], [1, 2, 3], [1, 3, 4], [4]],
      [[1, 3, 4], [2, 4], all, all],
      [[1, 2, 3], all, all, all],
      [[4], all, all, all],
    ];

    expect(
      new EliminateOtherCellsFromPossiblePair().run(onlyRowChanged),
    ).toBeTrue();
    expect(onlyRowChanged).toEqual([
      [[1, 3], [2], [1, 3], [4]],
      [all, all, [4], all],
      [all, all, [1, 2, 3], [4]],
      [all, all, [2], [1, 3, 4]],
    ]);

    expect(
      new EliminateOtherCellsFromPossiblePair().run(allChanged),
    ).toBeTrue();
    expect(allChanged).toEqual([
      [[2], [1, 3], [1, 3], [4]],
      [[1, 3], [2, 4], all, all],
      [[1, 3], all, all, all],
      [[4], all, all, all],
    ]);
  });
});
