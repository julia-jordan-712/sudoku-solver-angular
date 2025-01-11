import { TestPuzzle } from "src/test/puzzles/test-puzzle";

export class PuzzleAdvanced {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [1, null, null, null, null, 8, null, null, 9],
      [null, null, 2, null, null, null, null, null, 8],
      [null, 8, null, 5, 4, 9, null, null, null],
      [null, 4, null, 2, null, null, 9, null, null],
      [3, null, 9, null, null, null, 2, null, 1],
      [null, null, 1, null, null, 5, null, 4, null],
      [null, null, null, 9, 1, 2, null, 3, null],
      [7, null, null, null, null, null, 1, null, null],
      [2, null, null, 7, null, null, null, null, 6],
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
      [null, null, null, null, 3, null, null, null, 5],
      [8, null, 5, null, 2, 9, null, null, null],
      [null, null, null, null, null, null, null, 9, 8],
      [null, null, 2, 5, null, null, 4, null, null],
      [6, null, null, null, null, null, null, null, 1],
      [null, null, 9, null, null, 7, 6, null, null],
      [4, 2, null, null, null, null, null, null, null],
      [null, null, null, 8, 1, null, 2, null, 4],
      [1, null, null, null, 6, null, null, null, null],
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
      [null, null, 5, null, 3, 2, null, null, 1],
      [null, null, 2, 6, null, null, 5, 3, null],
      [7, 3, null, null, null, null, null, 8, null],
      [null, null, null, 3, 2, null, null, 5, null],
      [null, null, 4, null, 7, null, 3, null, null],
      [null, 7, null, null, 6, 5, null, null, null],
      [null, 9, null, null, null, null, null, 2, 5],
      [null, 2, 6, null, null, 7, 1, null, null],
      [4, null, null, 2, 5, null, 8, null, null],
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

  public static readonly PUZZLE_4: TestPuzzle = {
    puzzle: [
      [2, 4, null, null, null, 1, 8, null, null],
      [null, 6, 1, 9, null, null, null, 2, null],
      [null, null, null, 2, null, 4, 1, 6, null],
      [7, 1, null, null, null, null, null, null, null],
      [null, null, null, 8, null, 9, null, null, null],
      [null, null, null, null, null, null, null, 1, 2],
      [null, 2, 9, 4, null, 5, null, null, null],
      [null, 5, null, null, null, 8, 2, 7, null],
      [null, null, 4, 1, null, null, null, 5, 9],
    ],
    solution: [
      [2, 4, 5, 3, 6, 1, 8, 9, 7],
      [3, 6, 1, 9, 8, 7, 4, 2, 5],
      [9, 8, 7, 2, 5, 4, 1, 6, 3],
      [7, 1, 6, 5, 4, 2, 9, 3, 8],
      [5, 3, 2, 8, 1, 9, 7, 4, 6],
      [4, 9, 8, 7, 3, 6, 5, 1, 2],
      [6, 2, 9, 4, 7, 5, 3, 8, 1],
      [1, 5, 3, 6, 9, 8, 2, 7, 4],
      [8, 7, 4, 1, 2, 3, 6, 5, 9],
    ],
  };

  public static readonly PUZZLE_5: TestPuzzle = {
    puzzle: [
      [null, null, null, 4, null, null, 2, null, 8],
      [null, null, 1, 7, 2, null, 6, null, null],
      [null, 2, null, 6, null, null, null, null, null],
      [6, 7, null, null, null, null, null, null, null],
      [2, null, null, 3, null, 5, null, null, 4],
      [null, null, null, null, null, null, null, 9, 7],
      [null, null, null, null, null, 6, null, 5, null],
      [null, null, 5, null, 9, 8, 4, null, null],
      [1, null, 4, null, null, 7, null, null, null],
    ],
    solution: [
      [3, 9, 6, 4, 5, 1, 2, 7, 8],
      [8, 5, 1, 7, 2, 3, 6, 4, 9],
      [4, 2, 7, 6, 8, 9, 5, 3, 1],
      [6, 7, 8, 9, 1, 4, 3, 2, 5],
      [2, 1, 9, 3, 7, 5, 8, 6, 4],
      [5, 4, 3, 8, 6, 2, 1, 9, 7],
      [9, 8, 2, 1, 4, 6, 7, 5, 3],
      [7, 3, 5, 2, 9, 8, 4, 1, 6],
      [1, 6, 4, 5, 3, 7, 9, 8, 2],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleAdvanced.PUZZLE_1,
    PuzzleAdvanced.PUZZLE_2,
    PuzzleAdvanced.PUZZLE_3,
    PuzzleAdvanced.PUZZLE_4,
    PuzzleAdvanced.PUZZLE_5,
  ];
}
