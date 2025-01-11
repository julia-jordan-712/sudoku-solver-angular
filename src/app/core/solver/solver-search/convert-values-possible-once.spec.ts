import { ConvertValuesPossibleOnce } from "@app/core/solver/solver-search/convert-values-possible-once";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

describe(ConvertValuesPossibleOnce.name, () => {
  it("should find values which are only possible once in a row", () => {
    const grid: SudokuGrid = [
      [[1, 4], [1, 2, 4], 3, [1, 4]],
      [3, [1, 2, 4], [1, 4], [1, 2, 4]],
      [2, 3, [1, 4], [1, 4]],
      [[1, 4], [1, 4], 2, 3],
    ];
    const result = new ConvertValuesPossibleOnce().run(grid);
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
    const result = new ConvertValuesPossibleOnce().run(grid);
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
    const result = new ConvertValuesPossibleOnce().run(grid);
    expect(result).toBeTrue();
    expect(grid).toEqual([
      [[1, 4], 2, 3, [1, 2, 4]],
      [3, [1, 4], [1, 2, 4], [1, 2, 4]],
      [2, 3, [1, 4], [1, 4]],
      [[1, 4], [1, 2, 4], [1, 2, 4], 3],
    ]);
  });
});
