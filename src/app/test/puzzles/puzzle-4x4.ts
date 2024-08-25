import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export class Puzzle4x4 {
  public static readonly EMPTY: SudokuGrid = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
  ];
  public static readonly EMPTY_ROW: SudokuGrid = [
    [undefined, undefined, undefined, undefined],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  public static readonly EMPTY_COLUMN: SudokuGrid = [
    [undefined, 2, 3, 4],
    [undefined, 4, 1, 2],
    [undefined, 3, 4, 1],
    [undefined, 1, 2, 3],
  ];
  public static readonly EMPTY_SQUARE: SudokuGrid = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [undefined, undefined, 4, 1],
    [undefined, undefined, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_ROW: SudokuGrid = [
    [4, undefined, 3, 4],
    [3, undefined, 1, 2],
    [2, 3, 4, 1],
    [undefined, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_COLUMN: SudokuGrid = [
    [4, 2, 3, undefined],
    [undefined, undefined, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_SQUARE: SudokuGrid = [
    [1, 2, 3, 4],
    [3, undefined, 1, 2],
    [2, 4, undefined, 1],
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
