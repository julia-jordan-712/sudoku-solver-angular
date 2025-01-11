import { EmptyCellsToPossibleValues } from "@app/core/solver/solver-prepare/empty-cells-to-possible-values";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";

describe(EmptyCellsToPossibleValues.name, () => {
  describe("only one at a time", () => {
    it("should always convert the next undefined cell into all possible values in an empty Sudoku", () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.EMPTY);
      let result = new EmptyCellsToPossibleValues("ONLY_NEXT_CELL").run(grid);

      expect(result).toBeTrue();
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          if (x === 0 && y === 0) {
            expect(grid[x][y]).toEqual([1, 2, 3, 4]);
          } else {
            expect(grid[x][y]).toBeNull();
          }
        }
      }

      result = new EmptyCellsToPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(result).toBeTrue();
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          if (x === 0 && (y === 0 || y === 1)) {
            expect(grid[x][y]).toEqual([1, 2, 3, 4]);
          } else {
            expect(grid[x][y]).toBeNull();
          }
        }
      }
    });

    it("should return false if there is no undefined cell left", () => {
      const grid: SudokuGrid = [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
          [1, 2, 3, 4],
        ],
      ];
      const result = new EmptyCellsToPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(result).toBeFalse();
    });

    it("should determine correctly which values are allowed based on the row of the changed cell", () => {
      const grid: SudokuGrid = [
        [undefined, undefined, 3, 4],
        [undefined, undefined, 1, 2],
        [undefined, 3, 4, 1],
        [undefined, 1, 2, 3],
      ];
      new EmptyCellsToPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(grid[0][0]).toEqual([1, 2]);
    });

    it("should determine correctly which values are allowed based on the column of the changed cell", () => {
      const grid: SudokuGrid = [
        [undefined, undefined, undefined, undefined],
        [undefined, undefined, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ];
      new EmptyCellsToPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(grid[0][0]).toEqual([1, 3]);
    });

    it("should determine correctly which values are allowed based on the square of the changed cell", () => {
      const grid: SudokuGrid = [
        [undefined, undefined, undefined, undefined],
        [undefined, 4, 1, 2],
        [undefined, 3, 4, 1],
        [undefined, 1, 2, 3],
      ];
      new EmptyCellsToPossibleValues("ONLY_NEXT_CELL").run(grid);
      expect(grid[0][0]).toEqual([1, 2, 3]);
    });
  });

  describe("all values", () => {
    it("should convert all undefined cells into all possible values", () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.EMPTY);
      const result = new EmptyCellsToPossibleValues("ALL_CELLS").run(grid);
      expect(result).toBeTrue();
      expect(grid).toEqual(Puzzle4x4.INCOMPLETE_ALL_VALUES);
    });
  });
});
