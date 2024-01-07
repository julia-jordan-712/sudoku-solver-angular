import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { CleanupPossibleValues } from "./cleanup-possible-values";

describe(CleanupPossibleValues.name, () => {
  it("should always cleanup the next cell with possible values", () => {
    const grid: SudokuGrid = [
      [[1, 2, 3, 4], [1, 2, 3, 4], 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ];
    let result = new CleanupPossibleValues().run(grid);

    expect(result).toBeTrue();
    expect(grid).toEqual([
      [[1], [1, 2, 3, 4], 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ]);

    result = new CleanupPossibleValues().run(grid);
    expect(result).toBeTrue();
    expect(grid).toEqual([
      [[1], [2], 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ]);
  });

  it("should return false if there is no cell left which can be cleaned up", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, undefined],
      [3, 4, 1, undefined],
      [2, 3, 4, undefined],
      [undefined, undefined, undefined, [1, 2, 3]],
    ];
    const result = new CleanupPossibleValues().run(grid);
    expect(result).toBeFalse();
  });

  it("should cleanup correctly which values are allowed based on the row of the changed cell", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, undefined],
      [3, 4, 1, undefined],
      [2, 3, undefined, undefined],
      [4, 1, undefined, [1, 2, 3, 4]],
    ];
    const result = new CleanupPossibleValues().run(grid);
    expect(result).toBeTrue();
    expect(grid[3][3]).toEqual([2, 3]);
  });

  it("should cleanup correctly which values are allowed based on the column of the changed cell", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, undefined, undefined],
      [undefined, undefined, undefined, [1, 2, 3, 4]],
    ];
    const result = new CleanupPossibleValues().run(grid);
    expect(result).toBeTrue();
    expect(grid[3][3]).toEqual([1, 3]);
  });

  it("should cleanup correctly which values are allowed based on the square of the changed cell", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, undefined],
      [3, 4, 1, undefined],
      [2, 3, 4, undefined],
      [undefined, undefined, undefined, [1, 2, 3, 4]],
    ];
    const result = new CleanupPossibleValues().run(grid);
    expect(result).toBeTrue();
    expect(grid[3][3]).toEqual([1, 2, 3]);
  });
});
