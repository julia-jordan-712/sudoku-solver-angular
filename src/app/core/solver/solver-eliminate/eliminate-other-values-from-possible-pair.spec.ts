import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { EliminateOtherValuesFromPossiblePair } from "./eliminate-other-values-from-possible-pair";

describe(EliminateOtherValuesFromPossiblePair.name, () => {
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
      expect(new EliminateOtherValuesFromPossiblePair().run(grid)).toBeFalse();
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
      expect(new EliminateOtherValuesFromPossiblePair().run(grid)).toBeTrue();
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
      new EliminateOtherValuesFromPossiblePair().run(onlyRowChanged),
    ).toBeTrue();
    expect(onlyRowChanged).toEqual([
      [[1, 3], [2], [1, 3], [4]],
      [all, all, [4], all],
      [all, all, [1, 2, 3], [4]],
      [all, all, [2], [1, 3, 4]],
    ]);

    expect(
      new EliminateOtherValuesFromPossiblePair().run(allChanged),
    ).toBeTrue();
    expect(allChanged).toEqual([
      [[2], [1, 3], [1, 3], [4]],
      [[1, 3], [2, 4], all, all],
      [[1, 3], all, all, all],
      [[4], all, all, all],
    ]);
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
    new EliminateOtherValuesFromPossiblePair().run(sudoku);

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
});
