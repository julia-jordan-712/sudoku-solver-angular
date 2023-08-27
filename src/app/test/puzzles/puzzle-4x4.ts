import { Nullable } from '@app/shared/types/nullable';

export class Puzzle4x4 {
  public static readonly EMPTY: Nullable<number>[][] = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
  ];
  public static readonly EMPTY_ROW: Nullable<number>[][] = [
    [undefined, undefined, undefined, undefined],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  public static readonly EMPTY_COLUMN: Nullable<number>[][] = [
    [undefined, 2, 3, 4],
    [undefined, 4, 1, 2],
    [undefined, 3, 4, 1],
    [undefined, 1, 2, 3],
  ];
  public static readonly EMPTY_SQUARE: Nullable<number>[][] = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [undefined, undefined, 4, 1],
    [undefined, undefined, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_ROW: Nullable<number>[][] = [
    [4, , 3, 4],
    [3, , 1, 2],
    [2, 3, 4, 1],
    [, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_COLUMN: Nullable<number>[][] = [
    [4, 2, 3],
    [, , 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3],
  ];
  public static readonly INCOMPLETE_INVALID_SQUARE: Nullable<number>[][] = [
    [1, 2, 3, 4],
    [3, , 1, 2],
    [2, 4, , 1],
    [4, 1, 2, 3],
  ];
}
