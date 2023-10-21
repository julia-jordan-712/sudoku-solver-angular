import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { ValuesPossibleOnce } from "./values-possible-once";

describe(ValuesPossibleOnce.name, () => {
  it("should find values which are only possible once in a row", () => {
    const grid: SudokuGrid = [
      [[1, 4], [1, 2, 4], 3, [1, 4]],
      [3, [1, 2, 4], [1, 4], [1, 2, 4]],
      [2, 3, [1, 4], [1, 4]],
      [[1, 4], [1, 4], 2, 3],
    ];
    const result = new ValuesPossibleOnce().run(grid);
    expect(result).toBeTrue();
    expect(grid).toEqual([
      [[1, 4], 2, 3, [1, 4]],
      [3, [1, 2, 4], [1, 4], [1, 2, 4]],
      [2, 3, [1, 4], [1, 4]],
      [[1, 4], [1, 4], 2, 3],
    ]);
  });

  it("should find values which are only possible once in a column", () => {
    const grid: SudokuGrid = [
      [[1, 4], 2, 3, [1, 4]],
      [3, [1, 4], [1, 4], 2],
      [[1, 2, 4], 3, [1, 2, 4], [1, 4]],
      [[1, 4], [1, 2, 4], 2, 3],
    ];
    const result = new ValuesPossibleOnce().run(grid);
    expect(result).toBeTrue();
    expect(grid).toEqual([
      [[1, 4], 2, 3, [1, 4]],
      [3, [1, 4], [1, 4], 2],
      [2, 3, [1, 2, 4], [1, 4]],
      [[1, 4], [1, 2, 4], 2, 3],
    ]);
  });

  it("should find values which are only possible once in a square", () => {
    const grid: SudokuGrid = [
      [[1, 4], [1, 2, 4], 3, [1, 2, 4]],
      [3, [1, 4], [1, 2, 4], [1, 2, 4]],
      [2, 3, [1, 4], [1, 4]],
      [[1, 4], [1, 2, 4], [1, 2, 4], 3],
    ];
    const result = new ValuesPossibleOnce().run(grid);
    expect(result).toBeTrue();
    expect(grid).toEqual([
      [[1, 4], 2, 3, [1, 2, 4]],
      [3, [1, 4], [1, 2, 4], [1, 2, 4]],
      [2, 3, [1, 4], [1, 4]],
      [[1, 4], [1, 2, 4], [1, 2, 4], 3],
    ]);
  });
});
