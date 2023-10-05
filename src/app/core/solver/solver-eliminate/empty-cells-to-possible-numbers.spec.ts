import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { EmptyCellsToPossibleNumbers } from "./empty-cells-to-possible-numbers";

describe(EmptyCellsToPossibleNumbers.name, () => {
  it("should always convert the next undefined cell into all possible values in an empty Sudoku", () => {
    const grid: SudokuGrid = Puzzle4x4.EMPTY;
    let result = new EmptyCellsToPossibleNumbers().run(grid);

    expect(result).toBeTrue();
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (x === 0 && y === 0) {
          expect(grid[x][y]).toEqual([1, 2, 3, 4]);
        } else {
          expect(grid[x][y]).toBeUndefined();
        }
      }
    }

    result = new EmptyCellsToPossibleNumbers().run(grid);
    expect(result).toBeTrue();
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (x === 0 && (y === 0 || y === 1)) {
          expect(grid[x][y]).toEqual([1, 2, 3, 4]);
        } else {
          expect(grid[x][y]).toBeUndefined();
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
    const result = new EmptyCellsToPossibleNumbers().run(grid);
    expect(result).toBeFalse();
  });

  it("should determine correctly which values are allowed based on the row of the changed cell", () => {
    const grid: SudokuGrid = [
      [undefined, undefined, 3, 4],
      [undefined, undefined, 1, 2],
      [undefined, 3, 4, 1],
      [undefined, 1, 2, 3],
    ];
    new EmptyCellsToPossibleNumbers().run(grid);
    expect(grid[0][0]).toEqual([1, 2]);
  });

  it("should determine correctly which values are allowed based on the column of the changed cell", () => {
    const grid: SudokuGrid = [
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ];
    new EmptyCellsToPossibleNumbers().run(grid);
    expect(grid[0][0]).toEqual([1, 3]);
  });

  it("should determine correctly which values are allowed based on the square of the changed cell", () => {
    const grid: SudokuGrid = [
      [undefined, undefined, undefined, undefined],
      [undefined, 4, 1, 2],
      [undefined, 3, 4, 1],
      [undefined, 1, 2, 3],
    ];
    new EmptyCellsToPossibleNumbers().run(grid);
    expect(grid[0][0]).toEqual([1, 2, 3]);
  });
});
