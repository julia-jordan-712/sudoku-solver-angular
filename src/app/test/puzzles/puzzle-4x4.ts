import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export class Puzzle4x4 {
  public static readonly EMPTY: SudokuGrid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  public static readonly EMPTY_ROW: SudokuGrid = [
    [null, null, null, null],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  public static readonly EMPTY_COLUMN: SudokuGrid = [
    [null, 2, 3, 4],
    [null, 4, 1, 2],
    [null, 3, 4, 1],
    [null, 1, 2, 3],
  ];
  public static readonly EMPTY_SQUARE: SudokuGrid = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [null, null, 4, 1],
    [null, null, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_ROW: SudokuGrid = [
    [4, null, 3, 4],
    [3, null, 1, 2],
    [2, 3, 4, 1],
    [null, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_COLUMN: SudokuGrid = [
    [4, 2, 3, null],
    [null, null, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_SQUARE: SudokuGrid = [
    [1, 2, 3, 4],
    [3, null, 1, 2],
    [2, 4, null, 1],
    [4, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_ALL_VALUES: SudokuGrid = [
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
  ];
  public static readonly COMPLETE: SudokuGrid = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
}
