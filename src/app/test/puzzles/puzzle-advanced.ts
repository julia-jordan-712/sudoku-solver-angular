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

  public static readonly PUZZLE_2: TestPuzzle = {
    puzzle: [
      [
        undefined,
        undefined,
        undefined,
        undefined,
        3,
        undefined,
        undefined,
        undefined,
        5,
      ],
      [8, undefined, 5, undefined, 2, 9, undefined, undefined, undefined],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        9,
        8,
      ],
      [
        undefined,
        undefined,
        2,
        5,
        undefined,
        undefined,
        4,
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
        1,
      ],
      [
        undefined,
        undefined,
        9,
        undefined,
        undefined,
        7,
        6,
        undefined,
        undefined,
      ],
      [
        4,
        2,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [undefined, undefined, undefined, 8, 1, undefined, 2, undefined, 4],
      [
        1,
        undefined,
        undefined,
        undefined,
        6,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
    ],
    solution: [
      [9, 6, 1, 4, 3, 8, 7, 2, 5],
      [8, 3, 5, 7, 2, 9, 1, 4, 6],
      [2, 7, 4, 6, 5, 1, 3, 9, 8],
      [7, 1, 2, 5, 8, 6, 4, 3, 9],
      [6, 4, 8, 3, 9, 2, 5, 7, 1],
      [3, 5, 9, 1, 4, 7, 6, 8, 2],
      [4, 2, 6, 9, 7, 5, 8, 1, 3],
      [5, 9, 7, 8, 1, 3, 2, 6, 4],
      [1, 8, 3, 2, 6, 4, 9, 5, 7],
    ],
  };

  public static readonly PUZZLE_3: TestPuzzle = {
    puzzle: [
      [undefined, undefined, 5, undefined, 3, 2, undefined, undefined, 1],
      [undefined, undefined, 2, 6, undefined, undefined, 5, 3, undefined],
      [
        7,
        3,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        3,
        2,
        undefined,
        undefined,
        5,
        undefined,
      ],
      [
        undefined,
        undefined,
        4,
        undefined,
        7,
        undefined,
        3,
        undefined,
        undefined,
      ],
      [
        undefined,
        7,
        undefined,
        undefined,
        6,
        5,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        9,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        2,
        5,
      ],
      [undefined, 2, 6, undefined, undefined, 7, 1, undefined, undefined],
      [4, undefined, undefined, 2, 5, undefined, 8, undefined, undefined],
    ],
    solution: [
      [6, 8, 5, 7, 3, 2, 4, 9, 1],
      [1, 4, 2, 6, 8, 9, 5, 3, 7],
      [7, 3, 9, 5, 1, 4, 2, 8, 6],
      [9, 6, 1, 3, 2, 8, 7, 5, 4],
      [2, 5, 4, 9, 7, 1, 3, 6, 8],
      [3, 7, 8, 4, 6, 5, 9, 1, 2],
      [8, 9, 7, 1, 4, 3, 6, 2, 5],
      [5, 2, 6, 8, 9, 7, 1, 4, 3],
      [4, 1, 3, 2, 5, 6, 8, 7, 9],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleAdvanced.PUZZLE_1,
    PuzzleAdvanced.PUZZLE_2,
    PuzzleAdvanced.PUZZLE_3,
  ];
}
