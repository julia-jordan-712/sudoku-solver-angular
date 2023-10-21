import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SinglePossibleValue } from "./single-possible-value";

describe(SinglePossibleValue.name, () => {
  it("should always convert the next cell with only one possible value left", () => {
    const grid: SudokuGrid = [
      [1, [2], 3, 4],
      [3, undefined, 1, 2],
      [2, undefined, [4], 1],
      [4, undefined, 2, 3],
    ];
    let result = new SinglePossibleValue().run(grid);

    expect(result).toBeTrue();
    expect(grid).toEqual([
      [1, 2, 3, 4],
      [3, undefined, 1, 2],
      [2, undefined, [4], 1],
      [4, undefined, 2, 3],
    ]);

    result = new SinglePossibleValue().run(grid);
    expect(result).toBeTrue();
    expect(grid).toEqual([
      [1, 2, 3, 4],
      [3, undefined, 1, 2],
      [2, undefined, 4, 1],
      [4, undefined, 2, 3],
    ]);
  });

  it("should return false if there is no cell with only one value left", () => {
    const grid: SudokuGrid = [
      [undefined, undefined, undefined, undefined],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
      ],
    ];
    const result = new SinglePossibleValue().run(grid);
    expect(result).toBeFalse();
  });
});
