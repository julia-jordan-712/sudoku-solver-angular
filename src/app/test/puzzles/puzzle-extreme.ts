import { TestPuzzle } from "@app/test/puzzles/test-puzzle";

export class PuzzleExtreme {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [
        undefined,
        undefined,
        undefined,
        5,
        undefined,
        undefined,
        undefined,
        6,
        undefined,
      ],
      [
        8,
        undefined,
        9,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        undefined,
      ],
      [1, 6, undefined, undefined, 8, 7, undefined, undefined, undefined],
      [
        3,
        undefined,
        undefined,
        undefined,
        2,
        6,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        7,
        undefined,
        1,
        undefined,
        6,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        8,
        5,
        undefined,
        undefined,
        undefined,
        3,
      ],
      [undefined, undefined, undefined, 4, 7, undefined, undefined, 2, 1],
      [
        undefined,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        9,
        undefined,
        8,
      ],
      [
        undefined,
        8,
        undefined,
        undefined,
        undefined,
        3,
        undefined,
        undefined,
        undefined,
      ],
    ],
    solution: [
      [4, 7, 2, 5, 3, 1, 8, 6, 9],
      [8, 5, 9, 6, 4, 2, 3, 1, 7],
      [1, 6, 3, 9, 8, 7, 2, 5, 4],
      [3, 1, 8, 7, 2, 6, 4, 9, 5],
      [5, 9, 7, 3, 1, 4, 6, 8, 2],
      [6, 2, 4, 8, 5, 9, 1, 7, 3],
      [9, 3, 6, 4, 7, 8, 5, 2, 1],
      [7, 4, 1, 2, 6, 5, 9, 3, 8],
      [2, 8, 5, 1, 9, 3, 7, 4, 6],
    ],
  };
  public static readonly PUZZLE_2: TestPuzzle = {
    puzzle: [
      [undefined, undefined, undefined, 6, undefined, undefined, 1, 4, 2],
      [
        undefined,
        2,
        6,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [7, undefined, undefined, undefined, undefined, 4, 5, undefined, 9],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        6,
        2,
        undefined,
        undefined,
      ],
      [undefined, 6, undefined, 9, undefined, 1, undefined, 5, undefined],
      [
        undefined,
        undefined,
        5,
        3,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        9,
        undefined,
        undefined,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        7,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        8,
        1,
        undefined,
      ],
      [8, 4, 2, undefined, undefined, 7, undefined, undefined, undefined],
    ],
    solution: [
      [5, 8, 9, 6, 7, 3, 1, 4, 2],
      [4, 2, 6, 5, 1, 9, 3, 7, 8],
      [7, 1, 3, 8, 2, 4, 5, 6, 9],
      [3, 9, 4, 7, 5, 6, 2, 8, 1],
      [2, 6, 8, 9, 4, 1, 7, 5, 3],
      [1, 7, 5, 3, 8, 2, 4, 9, 6],
      [9, 5, 1, 4, 3, 8, 6, 2, 7],
      [6, 3, 7, 2, 9, 5, 8, 1, 4],
      [8, 4, 2, 1, 6, 7, 9, 3, 5],
    ],
  };
  public static readonly PUZZLE_3: TestPuzzle = {
    puzzle: [
      [
        9,
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        5,
        undefined,
      ],
      [undefined, undefined, 3, undefined, undefined, 9, undefined, 2, 1],
      [
        undefined,
        undefined,
        undefined,
        4,
        undefined,
        2,
        undefined,
        undefined,
        undefined,
      ],
      [undefined, 8, undefined, undefined, 4, undefined, 9, undefined, 2],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        7,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [5, undefined, 4, undefined, 6, undefined, undefined, 1, undefined],
      [
        undefined,
        undefined,
        undefined,
        5,
        undefined,
        6,
        undefined,
        undefined,
        undefined,
      ],
      [2, 5, undefined, 7, undefined, undefined, 8, undefined, undefined],
      [
        undefined,
        3,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        9,
        5,
      ],
    ],
    solution: [
      [9, 1, 2, 6, 3, 7, 4, 5, 8],
      [6, 4, 3, 8, 5, 9, 7, 2, 1],
      [8, 7, 5, 4, 1, 2, 6, 3, 9],
      [1, 8, 7, 3, 4, 5, 9, 6, 2],
      [3, 6, 9, 2, 7, 1, 5, 8, 4],
      [5, 2, 4, 9, 6, 8, 3, 1, 7],
      [4, 9, 8, 5, 2, 6, 1, 7, 3],
      [2, 5, 1, 7, 9, 3, 8, 4, 6],
      [7, 3, 6, 1, 8, 4, 2, 9, 5],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleExtreme.PUZZLE_1,
    PuzzleExtreme.PUZZLE_2,
    PuzzleExtreme.PUZZLE_3,
  ];
}
