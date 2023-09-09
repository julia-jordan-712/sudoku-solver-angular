import { TestPuzzle } from '@app/test/puzzles/test-puzzle';

export class PuzzleHard {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [undefined,4,,1,5,undefined,undefined,8,3],
      [undefined,3,undefined,undefined,6,undefined,5,undefined,undefined],
      [6,undefined,undefined,undefined,undefined,undefined,undefined,undefined,9],
      [undefined,5,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
      [1,undefined,undefined,7,undefined,8,undefined,undefined,2],
      [undefined,undefined,undefined,undefined,undefined,undefined,undefined,6,undefined],
      [5,undefined,undefined,undefined,undefined,undefined,undefined,undefined,4],
      [undefined,undefined,4,undefined,8,undefined,undefined,7,undefined],
      [8,6,undefined,undefined,2,4,undefined,9,undefined],
    ],
    solution: [
      [7,4,9,1,5,2,6,8,3],
      [2,3,1,8,6,9,5,4,7],
      [6,8,5,4,7,3,2,1,9],
      [4,5,2,9,1,6,7,3,8],
      [1,9,6,7,3,8,4,5,2],
      [3,7,8,2,4,5,9,6,1],
      [5,1,3,6,9,7,8,2,4],
      [9,2,4,5,8,1,3,7,6],
      [8,6,7,3,2,4,1,9,5],
    ],
  };
}
