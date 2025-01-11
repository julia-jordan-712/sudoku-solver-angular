import { ConvertSinglePossibleValue } from "@app/core/solver/solver-search/convert-single-possible-value";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

describe(ConvertSinglePossibleValue.name, () => {
  describe("only one at a time", () => {
    it("should always convert the next cell with only one possible value left", () => {
      const grid: SudokuGrid = [
        [1, [2], 3, 4],
        [3, undefined, 1, 2],
        [2, undefined, [4], 1],
        [4, undefined, 2, 3],
      ];
      let result = new ConvertSinglePossibleValue("ONLY_NEXT_CELL").run(grid);

      expect(result).toBeTrue();
      expect(grid).toEqual([
        [1, 2, 3, 4],
        [3, undefined, 1, 2],
        [2, undefined, [4], 1],
        [4, undefined, 2, 3],
      ]);

      result = new ConvertSinglePossibleValue("ONLY_NEXT_CELL").run(grid);
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
      const result = new ConvertSinglePossibleValue("ONLY_NEXT_CELL").run(grid);
      expect(result).toBeFalse();
    });
  });

  describe("all cells", () => {
    it("should convert all cells with only one possible value into real values", () => {
      const all: number[] = [1, 2, 3, 4];
      const grid: SudokuGrid = [
        [[1], all, all, all],
        [all, [2], all, all],
        [all, all, [3], all],
        [all, all, all, [4]],
      ];

      const result = new ConvertSinglePossibleValue("ALL_CELLS").run(grid);
      expect(result).toBeTrue();

      expect(grid).toEqual([
        [1, all, all, all],
        [all, 2, all, all],
        [all, all, 3, all],
        [all, all, all, 4],
      ]);
    });
  });
});
