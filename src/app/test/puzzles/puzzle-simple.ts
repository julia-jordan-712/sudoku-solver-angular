import { TestPuzzle } from "@app/test/puzzles/test-puzzle";

export class PuzzleSimple {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [undefined, 8, undefined, 4, undefined, 9, 6, 5, 3],
      [6, 4, 2, 8, undefined, undefined, undefined, 7, undefined],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
        undefined,
        undefined,
      ],
      [undefined, undefined, 7, undefined, undefined, 5, undefined, 4, 2],
      [
        undefined,
        undefined,
        undefined,
        7,
        undefined,
        1,
        undefined,
        undefined,
        undefined,
      ],
      [8, 5, undefined, 6, undefined, undefined, 1, undefined, undefined],
      [
        undefined,
        undefined,
        6,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [undefined, 1, undefined, undefined, undefined, 4, 7, 3, 6],
      [2, 7, 3, 5, undefined, 8, undefined, 1, undefined],
    ],
    solution: [
      [7, 8, 1, 4, 2, 9, 6, 5, 3],
      [6, 4, 2, 8, 5, 3, 9, 7, 1],
      [9, 3, 5, 1, 7, 6, 8, 2, 4],
      [1, 6, 7, 9, 8, 5, 3, 4, 2],
      [3, 2, 9, 7, 4, 1, 5, 6, 8],
      [8, 5, 4, 6, 3, 2, 1, 9, 7],
      [4, 9, 6, 3, 1, 7, 2, 8, 5],
      [5, 1, 8, 2, 9, 4, 7, 3, 6],
      [2, 7, 3, 5, 6, 8, 4, 1, 9],
    ],
  };
}
