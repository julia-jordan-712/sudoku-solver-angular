import { TestPuzzle } from "src/test/puzzles/test-puzzle";

export class PuzzleHard {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [null, 4, null, 1, 5, null, null, 8, 3],
      [null, 3, null, null, 6, null, 5, null, null],
      [6, null, null, null, null, null, null, null, 9],
      [null, 5, null, null, null, null, null, null, null],
      [1, null, null, 7, null, 8, null, null, 2],
      [null, null, null, null, null, null, null, 6, null],
      [5, null, null, null, null, null, null, null, 4],
      [null, null, 4, null, 8, null, null, 7, null],
      [8, 6, null, null, 2, 4, null, 9, null],
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
      [null, null, 9, null, null, null, 7, 3, 1],
      [null, 3, null, null, null, 7, null, null, null],
      [null, null, null, 3, 4, null, 8, null, null],
      [7, null, null, null, null, null, null, 5, null],
      [8, 9, null, 5, null, 6, null, 4, 7],
      [null, 5, null, null, null, null, null, null, 6],
      [null, null, 6, null, 5, 9, null, null, null],
      [null, null, null, 2, null, null, null, 1, null],
      [5, 8, 2, null, null, null, 3, null, null],
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
      [9, null, null, 4, null, null, 5, null, 2],
      [null, null, 1, null, 2, null, 9, null, null],
      [null, 7, null, null, null, null, 8, null, null],
      [3, null, null, null, 7, null, null, 5, null],
      [null, null, 7, null, 8, null, 3, null, null],
      [null, 2, null, null, 6, null, null, null, 1],
      [null, null, 6, null, null, null, null, 4, null],
      [null, null, 4, null, 3, null, 1, null, null],
      [2, null, 8, null, null, 1, null, null, 7],
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

  public static readonly PUZZLE_4: TestPuzzle = {
    puzzle: [
      [5, 1, null, null, null, null, 7, 4, null],
      [null, 6, 9, null, 8, 7, null, null, null],
      [2, null, 7, null, null, null, null, null, null],
      [null, null, null, null, 2, 9, 6, null, null],
      [1, null, null, 6, null, 3, null, null, 8],
      [null, null, 3, 8, 4, null, null, null, null],
      [null, null, null, null, null, null, 9, null, 6],
      [null, null, null, 4, 6, null, 2, 8, null],
      [null, 2, 6, null, null, null, null, 1, 4],
    ],
    solution: [
      [5, 1, 8, 9, 3, 6, 7, 4, 2],
      [4, 6, 9, 2, 8, 7, 3, 5, 1],
      [2, 3, 7, 5, 1, 4, 8, 6, 9],
      [7, 8, 4, 1, 2, 9, 6, 3, 5],
      [1, 5, 2, 6, 7, 3, 4, 9, 8],
      [6, 9, 3, 8, 4, 5, 1, 2, 7],
      [8, 4, 1, 3, 5, 2, 9, 7, 6],
      [9, 7, 5, 4, 6, 1, 2, 8, 3],
      [3, 2, 6, 7, 9, 8, 5, 1, 4],
    ],
  };

  public static readonly PUZZLE_5: TestPuzzle = {
    puzzle: [
      [null, 4, 7, null, null, null, null, null, 1],
      [8, 3, null, null, null, 7, null, null, 2],
      [null, null, null, 9, null, null, 6, null, null],
      [null, 2, null, 4, null, null, 7, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, 8, null, null, 6, null, 4, null],
      [null, null, 4, null, null, 3, null, null, null],
      [2, null, null, 5, null, null, null, 3, 8],
      [1, null, null, null, null, null, 2, 9, null],
    ],
    solution: [
      [9, 4, 7, 6, 5, 2, 3, 8, 1],
      [8, 3, 6, 1, 4, 7, 9, 5, 2],
      [5, 1, 2, 9, 3, 8, 6, 7, 4],
      [3, 2, 1, 4, 8, 5, 7, 6, 9],
      [4, 6, 5, 7, 1, 9, 8, 2, 3],
      [7, 9, 8, 3, 2, 6, 1, 4, 5],
      [6, 8, 4, 2, 9, 3, 5, 1, 7],
      [2, 7, 9, 5, 6, 1, 4, 3, 8],
      [1, 5, 3, 8, 7, 4, 2, 9, 6],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleHard.PUZZLE_1,
    PuzzleHard.PUZZLE_2,
    PuzzleHard.PUZZLE_3,
    PuzzleHard.PUZZLE_4,
    PuzzleHard.PUZZLE_5,
  ];
}
