import { CleanupPossibleValues } from "@app/core/solver/solver-clean-up/cleanup-possible-values";
import { SudokuGrid } from "@app/types/sudoku-grid";

describe(CleanupPossibleValues.name, () => {
  describe("only one at a time", () => {
    it("should always cleanup the next cell with possible values", () => {
      const grid: SudokuGrid = [
        [[1, 2, 3, 4], [1, 2, 3, 4], 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ];
      let result = new CleanupPossibleValues("ONLY_NEXT_CELL").run(grid);

      expect(result).toBeTrue();
      expect(grid).toEqual([
        [[1], [1, 2, 3, 4], 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ]);

      result = new CleanupPossibleValues("ONLY_NEXT_CELL").run(grid);
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
      const result = new CleanupPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(result).toBeFalse();
    });

    it("should cleanup correctly which values are allowed based on the row of the changed cell", () => {
      const grid: SudokuGrid = [
        [1, 2, 3, undefined],
        [3, 4, 1, undefined],
        [2, 3, undefined, undefined],
        [4, 1, undefined, [1, 2, 3, 4]],
      ];
      const result = new CleanupPossibleValues("ONLY_NEXT_CELL").run(grid);
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
      const result = new CleanupPossibleValues("ONLY_NEXT_CELL").run(grid);
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
      const result = new CleanupPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(result).toBeTrue();
      expect(grid[3][3]).toEqual([1, 2, 3]);
    });
  });

  describe("all cells", () => {
    it("should clean up possible values for all numbers in all cells", () => {
      const all: number[] = [1, 2, 3, 4];
      const grid: SudokuGrid = [
        [1, all, all, all],
        [all, all, all, all],
        [all, all, all, all],
        [all, all, all, 4],
      ];

      const result = new CleanupPossibleValues("ALL_CELLS").run(grid);
      expect(result).toBeTrue();

      const no1: number[] = [2, 3, 4];
      const no4: number[] = [1, 2, 3];
      expect(grid).toEqual([
        [1, no1, no1, [2, 3]],
        [no1, no1, all, no4],
        [no1, all, no4, no4],
        [[2, 3], no4, no4, 4],
      ]);
    });
  });
});
