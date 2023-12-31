import { TestPuzzle } from "@app/test/puzzles/test-puzzle";

export class PuzzleAdvanced {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
        undefined,
        undefined,
        9,
      ],
      [
        undefined,
        undefined,
        2,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
      ],
      [undefined, 8, undefined, 5, 4, 9, undefined, undefined, undefined],
      [
        undefined,
        4,
        undefined,
        2,
        undefined,
        undefined,
        9,
        undefined,
        undefined,
      ],
      [3, undefined, 9, undefined, undefined, undefined, 2, undefined, 1],
      [
        undefined,
        undefined,
        1,
        undefined,
        undefined,
        5,
        undefined,
        4,
        undefined,
      ],
      [undefined, undefined, undefined, 9, 1, 2, undefined, 3, undefined],
      [
        7,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        undefined,
        undefined,
      ],
      [
        2,
        undefined,
        undefined,
        7,
        undefined,
        undefined,
        undefined,
        undefined,
        6,
      ],
    ],
    solution: [
      [1, 3, 4, 6, 2, 8, 5, 7, 9],
      [9, 5, 2, 1, 3, 7, 4, 6, 8],
      [6, 8, 7, 5, 4, 9, 3, 1, 2],
      [5, 4, 6, 2, 7, 1, 9, 8, 3],
      [3, 7, 9, 4, 8, 6, 2, 5, 1],
      [8, 2, 1, 3, 9, 5, 6, 4, 7],
      [4, 6, 8, 9, 1, 2, 7, 3, 5],
      [7, 9, 5, 8, 6, 3, 1, 2, 4],
      [2, 1, 3, 7, 5, 4, 8, 9, 6],
    ],
  };
}
