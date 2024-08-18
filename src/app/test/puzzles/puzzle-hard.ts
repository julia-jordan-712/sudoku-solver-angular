import { TestPuzzle } from "@app/test/puzzles/test-puzzle";

export class PuzzleHard {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [undefined, 4, undefined, 1, 5, undefined, undefined, 8, 3],
      [
        undefined,
        3,
        undefined,
        undefined,
        6,
        undefined,
        5,
        undefined,
        undefined,
      ],
      [
        6,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        9,
      ],
      [
        undefined,
        5,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [1, undefined, undefined, 7, undefined, 8, undefined, undefined, 2],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        6,
        undefined,
      ],
      [
        5,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        4,
      ],
      [
        undefined,
        undefined,
        4,
        undefined,
        8,
        undefined,
        undefined,
        7,
        undefined,
      ],
      [8, 6, undefined, undefined, 2, 4, undefined, 9, undefined],
    ],
    solution: [
      [7, 4, 9, 1, 5, 2, 6, 8, 3],
      [2, 3, 1, 8, 6, 9, 5, 4, 7],
      [6, 8, 5, 4, 7, 3, 2, 1, 9],
      [4, 5, 2, 9, 1, 6, 7, 3, 8],
      [1, 9, 6, 7, 3, 8, 4, 5, 2],
      [3, 7, 8, 2, 4, 5, 9, 6, 1],
      [5, 1, 3, 6, 9, 7, 8, 2, 4],
      [9, 2, 4, 5, 8, 1, 3, 7, 6],
      [8, 6, 7, 3, 2, 4, 1, 9, 5],
    ],
  };

  public static readonly PUZZLE_2: TestPuzzle = {
    puzzle: [
      [undefined, undefined, 9, undefined, undefined, undefined, 7, 3, 1],
      [
        undefined,
        3,
        undefined,
        undefined,
        undefined,
        7,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        3,
        4,
        undefined,
        8,
        undefined,
        undefined,
      ],
      [
        7,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        5,
        undefined,
      ],
      [8, 9, undefined, 5, undefined, 6, undefined, 4, 7],
      [
        undefined,
        5,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        6,
      ],
      [
        undefined,
        undefined,
        6,
        undefined,
        5,
        9,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        2,
        undefined,
        undefined,
        undefined,
        1,
        undefined,
      ],
      [5, 8, 2, undefined, undefined, undefined, 3, undefined, undefined],
    ],
    solution: [
      [4, 2, 9, 6, 8, 5, 7, 3, 1],
      [1, 3, 8, 9, 2, 7, 5, 6, 4],
      [6, 7, 5, 3, 4, 1, 8, 9, 2],
      [7, 6, 4, 8, 9, 2, 1, 5, 3],
      [8, 9, 3, 5, 1, 6, 2, 4, 7],
      [2, 5, 1, 4, 7, 3, 9, 8, 6],
      [3, 1, 6, 7, 5, 9, 4, 2, 8],
      [9, 4, 7, 2, 3, 8, 6, 1, 5],
      [5, 8, 2, 1, 6, 4, 3, 7, 9],
    ],
  };

  public static readonly PUZZLE_3: TestPuzzle = {
    puzzle: [
      [9, undefined, undefined, 4, undefined, undefined, 5, undefined, 2],
      [
        undefined,
        undefined,
        1,
        undefined,
        2,
        undefined,
        9,
        undefined,
        undefined,
      ],
      [
        undefined,
        7,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
        undefined,
        undefined,
      ],
      [
        3,
        undefined,
        undefined,
        undefined,
        7,
        undefined,
        undefined,
        5,
        undefined,
      ],
      [
        undefined,
        undefined,
        7,
        undefined,
        8,
        undefined,
        3,
        undefined,
        undefined,
      ],
      [
        undefined,
        2,
        undefined,
        undefined,
        6,
        undefined,
        undefined,
        undefined,
        1,
      ],
      [
        undefined,
        undefined,
        6,
        undefined,
        undefined,
        undefined,
        undefined,
        4,
        undefined,
      ],
      [
        undefined,
        undefined,
        4,
        undefined,
        3,
        undefined,
        1,
        undefined,
        undefined,
      ],
      [2, undefined, 8, undefined, undefined, 1, undefined, undefined, 7],
    ],
    solution: [
      [9, 8, 3, 4, 1, 7, 5, 6, 2],
      [6, 4, 1, 8, 2, 5, 9, 7, 3],
      [5, 7, 2, 6, 9, 3, 8, 1, 4],
      [3, 6, 9, 1, 7, 2, 4, 5, 8],
      [4, 1, 7, 5, 8, 9, 3, 2, 6],
      [8, 2, 5, 3, 6, 4, 7, 9, 1],
      [1, 3, 6, 7, 5, 8, 2, 4, 9],
      [7, 9, 4, 2, 3, 6, 1, 8, 5],
      [2, 5, 8, 9, 4, 1, 6, 3, 7],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleHard.PUZZLE_1,
    PuzzleHard.PUZZLE_2,
    PuzzleHard.PUZZLE_3,
  ];
}
