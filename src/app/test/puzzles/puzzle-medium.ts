import { TestPuzzle } from '@app/test/puzzles/test-puzzle';

export class PuzzleMedium {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [1,3,undefined,8,undefined,undefined,6,undefined,undefined],
      [undefined,undefined,2,undefined,undefined,7,undefined,undefined,undefined],
      [undefined,undefined,undefined,1,2,undefined,undefined,7,9],
      [2,8,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
      [undefined,9,undefined,undefined,3,undefined,undefined,1,undefined],
      [undefined,undefined,undefined,undefined,undefined,undefined,undefined,2,3],
      [5,7,undefined,undefined,8,3,undefined,undefined,undefined],
      [undefined,undefined,undefined,4,undefined,undefined,9,undefined,undefined],
      [undefined,undefined,9,undefined,undefined,2,undefined,6,7],
    ],
    solution: [
      [1,3,7,8,4,9,6,5,2],
      [9,5,2,3,6,7,1,8,4],
      [4,6,8,1,2,5,3,7,9],
      [2,8,3,7,5,1,4,9,6],
      [6,9,5,2,3,4,7,1,8],
      [7,1,4,6,9,8,5,2,3],
      [5,7,6,9,8,3,2,4,1],
      [8,2,1,4,7,6,9,3,5],
      [3,4,9,5,1,2,8,6,7],
    ],
  };
}
