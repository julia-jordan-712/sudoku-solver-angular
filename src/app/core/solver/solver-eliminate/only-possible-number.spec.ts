import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { OnlyPossibleNumber } from "./only-possible-number";

describe(OnlyPossibleNumber.name, () => {
  it("should always convert the next cell with only one possible value left", () => {
    const grid: SudokuGrid = [
      [1, [2], 3, 4],
      [3, undefined, 1, 2],
      [2, undefined, [4], 1],
      [4, undefined, 2, 3],
    ];
    let result = new OnlyPossibleNumber().run(grid);

    expect(result).toBeTrue();
    expect(grid).toEqual([
      [1, 2, 3, 4],
      [3, undefined, 1, 2],
      [2, undefined, [4], 1],
      [4, undefined, 2, 3],
    ]);

    result = new OnlyPossibleNumber().run(grid);
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
    const result = new OnlyPossibleNumber().run(grid);
    expect(result).toBeFalse();
  });
});
