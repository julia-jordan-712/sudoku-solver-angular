import { TestPuzzle } from "@app/test/puzzles/test-puzzle";

export class PuzzleMedium {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [1, 3, null, 8, null, null, 6, null, null],
      [null, null, 2, null, null, 7, null, null, null],
      [null, null, null, 1, 2, null, null, 7, 9],
      [2, 8, null, null, null, null, null, null, null],
      [null, 9, null, null, 3, null, null, 1, null],
      [null, null, null, null, null, null, null, 2, 3],
      [5, 7, null, null, 8, 3, null, null, null],
      [null, null, null, 4, null, null, 9, null, null],
      [null, null, 9, null, null, 2, null, 6, 7],
    ],
    solution: [
      [1, 3, 7, 8, 4, 9, 6, 5, 2],
      [9, 5, 2, 3, 6, 7, 1, 8, 4],
      [4, 6, 8, 1, 2, 5, 3, 7, 9],
      [2, 8, 3, 7, 5, 1, 4, 9, 6],
      [6, 9, 5, 2, 3, 4, 7, 1, 8],
      [7, 1, 4, 6, 9, 8, 5, 2, 3],
      [5, 7, 6, 9, 8, 3, 2, 4, 1],
      [8, 2, 1, 4, 7, 6, 9, 3, 5],
      [3, 4, 9, 5, 1, 2, 8, 6, 7],
    ],
  };

  public static readonly PUZZLE_2: TestPuzzle = {
    puzzle: [
      [null, 5, null, 4, null, null, null, 7, null],
      [8, null, null, null, null, 5, 1, null, null],
      [null, null, 9, 8, 3, null, null, 5, null],
      [1, null, 8, null, null, null, null, null, null],
      [2, 4, null, null, null, null, null, 6, 1],
      [null, null, null, null, null, null, 3, null, 2],
      [null, 1, null, null, 7, 8, 6, null, null],
      [null, null, 6, 3, null, null, null, null, 7],
      [null, 9, null, null, null, 4, null, 8, null],
    ],
    solution: [
      [3, 5, 1, 4, 6, 2, 9, 7, 8],
      [8, 2, 4, 7, 9, 5, 1, 3, 6],
      [6, 7, 9, 8, 3, 1, 2, 5, 4],
      [1, 3, 8, 2, 4, 6, 7, 9, 5],
      [2, 4, 7, 9, 5, 3, 8, 6, 1],
      [9, 6, 5, 1, 8, 7, 3, 4, 2],
      [4, 1, 3, 5, 7, 8, 6, 2, 9],
      [5, 8, 6, 3, 2, 9, 4, 1, 7],
      [7, 9, 2, 6, 1, 4, 5, 8, 3],
    ],
  };

  public static readonly PUZZLE_3: TestPuzzle = {
    puzzle: [
      [3, null, null, null, null, null, null, 7, 8],
      [null, null, null, null, null, 8, 3, 4, null],
      [8, null, null, 2, null, 4, 5, null, null],
      [null, 3, null, null, 8, null, 4, 2, null],
      [2, null, null, null, 6, null, null, null, 1],
      [null, 4, 8, null, 1, null, null, 3, null],
      [null, null, 3, 8, null, 5, null, null, 2],
      [null, 5, 9, 7, null, null, null, null, null],
      [1, 8, null, null, null, null, null, null, 4],
    ],
    solution: [
      [3, 1, 4, 6, 5, 9, 2, 7, 8],
      [5, 2, 6, 1, 7, 8, 3, 4, 9],
      [8, 9, 7, 2, 3, 4, 5, 1, 6],
      [6, 3, 1, 9, 8, 7, 4, 2, 5],
      [2, 7, 5, 4, 6, 3, 9, 8, 1],
      [9, 4, 8, 5, 1, 2, 6, 3, 7],
      [7, 6, 3, 8, 4, 5, 1, 9, 2],
      [4, 5, 9, 7, 2, 1, 8, 6, 3],
      [1, 8, 2, 3, 9, 6, 7, 5, 4],
    ],
  };

  public static readonly PUZZLE_4: TestPuzzle = {
    puzzle: [
      [1, null, null, 6, 2, null, null, null, 4],
      [null, null, null, 4, null, null, null, 2, null],
      [null, null, null, null, null, 1, null, 9, 5],
      [null, 1, null, 5, null, 2, 8, null, null],
      [null, null, 4, null, null, null, 5, null, null],
      [null, null, 6, 3, null, 8, null, 4, null],
      [7, 5, null, 2, null, null, null, null, null],
      [null, 6, null, null, null, 7, null, null, null],
      [2, null, null, null, 1, 6, null, null, 8],
    ],
    solution: [
      [1, 7, 9, 6, 2, 5, 3, 8, 4],
      [6, 8, 5, 4, 9, 3, 1, 2, 7],
      [4, 3, 2, 7, 8, 1, 6, 9, 5],
      [3, 1, 7, 5, 4, 2, 8, 6, 9],
      [8, 2, 4, 1, 6, 9, 5, 7, 3],
      [5, 9, 6, 3, 7, 8, 2, 4, 1],
      [7, 5, 8, 2, 3, 4, 9, 1, 6],
      [9, 6, 1, 8, 5, 7, 4, 3, 2],
      [2, 4, 3, 9, 1, 6, 7, 5, 8],
    ],
  };

  public static readonly PUZZLE_5: TestPuzzle = {
    puzzle: [
      [5, 4, null, 1, null, null, 9, null, null],
      [null, null, null, 5, null, null, null, 3, null],
      [null, null, 9, 6, null, null, 2, null, 8],
      [9, null, null, 3, 8, null, null, null, null],
      [null, null, null, 9, 6, 7, null, null, null],
      [null, null, null, null, 1, 2, null, null, 3],
      [6, null, 8, null, null, 3, 5, null, null],
      [null, 7, null, null, null, 1, null, null, null],
      [null, null, 4, null, null, 6, null, 7, 1],
    ],
    solution: [
      [5, 4, 2, 1, 3, 8, 9, 6, 7],
      [7, 8, 6, 5, 2, 9, 1, 3, 4],
      [1, 3, 9, 6, 7, 4, 2, 5, 8],
      [9, 6, 1, 3, 8, 5, 7, 4, 2],
      [4, 2, 3, 9, 6, 7, 8, 1, 5],
      [8, 5, 7, 4, 1, 2, 6, 9, 3],
      [6, 1, 8, 7, 4, 3, 5, 2, 9],
      [3, 7, 5, 2, 9, 1, 4, 8, 6],
      [2, 9, 4, 8, 5, 6, 3, 7, 1],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleMedium.PUZZLE_1,
    PuzzleMedium.PUZZLE_2,
    PuzzleMedium.PUZZLE_3,
    PuzzleMedium.PUZZLE_4,
    PuzzleMedium.PUZZLE_5,
  ];
}
