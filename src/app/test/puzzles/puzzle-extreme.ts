import { TestPuzzle } from '@app/test/puzzles/test-puzzle';

export class PuzzleExtreme {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [undefined,undefined,undefined,5,undefined,undefined,undefined,6,undefined],
      [8,undefined,9,undefined,undefined,undefined,undefined,1,undefined],
      [1,6,undefined,undefined,8,7,undefined,undefined,undefined],
      [3,undefined,undefined,undefined,2,6,undefined,undefined,undefined],
      [undefined,undefined,7,undefined,1,undefined,6,undefined,undefined],
      [undefined,undefined,undefined,8,5,undefined,undefined,undefined,3],
      [undefined,undefined,undefined,4,7,undefined,undefined,2,1],
      [undefined,4,undefined,undefined,undefined,undefined,9,undefined,8],
      [undefined,8,undefined,undefined,undefined,3,undefined,undefined,undefined],
    ],
    solution: [
      [4,7,2,5,3,1,8,6,9],
      [8,5,9,6,4,2,3,1,7],
      [1,6,3,9,8,7,2,5,4],
      [3,1,8,7,2,6,4,9,5],
      [5,9,7,3,1,4,6,8,2],
      [6,2,4,8,5,9,1,7,3],
      [9,3,6,4,7,8,5,2,1],
      [7,4,1,2,6,5,9,3,8],
      [2,8,5,1,9,3,7,4,6],
    ],
  };
}
