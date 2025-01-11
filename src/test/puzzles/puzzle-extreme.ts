import { TestPuzzle } from "src/test/puzzles/test-puzzle";

export class PuzzleExtreme {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [null, null, null, 5, null, null, null, 6, null],
      [8, null, 9, null, null, null, null, 1, null],
      [1, 6, null, null, 8, 7, null, null, null],
      [3, null, null, null, 2, 6, null, null, null],
      [null, null, 7, null, 1, null, 6, null, null],
      [null, null, null, 8, 5, null, null, null, 3],
      [null, null, null, 4, 7, null, null, 2, 1],
      [null, 4, null, null, null, null, 9, null, 8],
      [null, 8, null, null, null, 3, null, null, null],
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
      [null, null, null, 6, null, null, 1, 4, 2],
      [null, 2, 6, null, null, null, null, null, null],
      [7, null, null, null, null, 4, 5, null, 9],
      [null, null, null, null, null, 6, 2, null, null],
      [null, 6, null, 9, null, 1, null, 5, null],
      [null, null, 5, 3, null, null, null, null, null],
      [9, null, null, 4, null, null, null, null, 7],
      [null, null, null, null, null, null, 8, 1, null],
      [8, 4, 2, null, null, 7, null, null, null],
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
      [9, 1, null, null, null, null, null, 5, null],
      [null, null, 3, null, null, 9, null, 2, 1],
      [null, null, null, 4, null, 2, null, null, null],
      [null, 8, null, null, 4, null, 9, null, 2],
      [null, null, null, null, 7, null, null, null, null],
      [5, null, 4, null, 6, null, null, 1, null],
      [null, null, null, 5, null, 6, null, null, null],
      [2, 5, null, 7, null, null, 8, null, null],
      [null, 3, null, null, null, null, null, 9, 5],
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

  public static readonly PUZZLE_4: TestPuzzle = {
    puzzle: [
      [null, null, null, 3, null, null, 5, null, null],
      [null, null, null, null, 4, null, null, 8, null],
      [null, 1, null, 5, 7, 9, 4, null, 3],
      [5, null, 2, null, null, null, null, null, null],
      [null, null, 4, null, null, null, 1, null, null],
      [null, null, null, null, null, null, 9, null, 7],
      [4, null, 7, 9, 1, 5, null, 3, null],
      [null, 6, null, null, 8, null, null, null, null],
      [null, null, 1, null, null, 3, null, null, null],
    ],
    solution: [
      [2, 4, 9, 3, 6, 8, 5, 7, 1],
      [7, 3, 5, 2, 4, 1, 6, 8, 9],
      [6, 1, 8, 5, 7, 9, 4, 2, 3],
      [5, 7, 2, 1, 9, 6, 3, 4, 8],
      [3, 9, 4, 8, 5, 7, 1, 6, 2],
      [1, 8, 6, 4, 3, 2, 9, 5, 7],
      [4, 2, 7, 9, 1, 5, 8, 3, 6],
      [9, 6, 3, 7, 8, 4, 2, 1, 5],
      [8, 5, 1, 6, 2, 3, 7, 9, 4],
    ],
  };

  public static readonly PUZZLE_5: TestPuzzle = {
    puzzle: [
      [9, null, null, null, null, null, null, 6, null],
      [3, null, 5, null, null, 8, null, null, null],
      [null, null, null, 6, null, 3, 7, null, null],
      [null, 8, 4, null, 3, null, null, null, null],
      [1, null, null, null, null, null, null, null, 9],
      [null, null, null, null, 6, null, 3, 1, null],
      [null, null, 2, 8, null, 5, null, null, null],
      [null, null, null, 4, null, null, 2, null, 1],
      [null, 5, null, null, null, null, null, null, 6],
    ],
    solution: [
      [9, 4, 7, 2, 5, 1, 8, 6, 3],
      [3, 6, 5, 9, 7, 8, 1, 2, 4],
      [2, 1, 8, 6, 4, 3, 7, 9, 5],
      [5, 8, 4, 1, 3, 9, 6, 7, 2],
      [1, 3, 6, 7, 8, 2, 5, 4, 9],
      [7, 2, 9, 5, 6, 4, 3, 1, 8],
      [6, 9, 2, 8, 1, 5, 4, 3, 7],
      [8, 7, 3, 4, 9, 6, 2, 5, 1],
      [4, 5, 1, 3, 2, 7, 9, 8, 6],
    ],
  };
  public static readonly PUZZLE_6: TestPuzzle = {
    puzzle: [
      [null, null, 5, 7, null, null, null, null, 8],
      [6, null, null, null, null, 9, null, null, null],
      [null, null, 3, null, null, null, 4, null, 2],
      [null, null, null, null, 3, null, 9, 7, null],
      [5, null, 6, null, null, 4, null, null, null],
      [null, 7, null, null, 2, null, null, null, null],
      [null, null, null, null, 1, null, null, null, null],
      [null, 4, null, null, null, null, 3, null, null],
      [2, null, 1, null, null, null, null, 8, 9],
    ],
    solution: [
      [1, 9, 5, 7, 4, 2, 6, 3, 8],
      [6, 2, 4, 3, 8, 9, 1, 5, 7],
      [7, 8, 3, 1, 6, 5, 4, 9, 2],
      [4, 1, 2, 5, 3, 8, 9, 7, 6],
      [5, 3, 6, 9, 7, 4, 8, 2, 1],
      [9, 7, 8, 6, 2, 1, 5, 4, 3],
      [3, 5, 9, 8, 1, 7, 2, 6, 4],
      [8, 4, 7, 2, 9, 6, 3, 1, 5],
      [2, 6, 1, 4, 5, 3, 7, 8, 9],
    ],
  };
  public static readonly PUZZLE_7: TestPuzzle = {
    puzzle: [
      [null, null, null, null, null, null, null, 2, null],
      [null, 7, null, 3, 4, null, null, null, null],
      [null, 3, null, 1, null, null, 7, null, null],
      [1, null, 3, 7, null, null, null, null, null],
      [null, null, null, null, null, null, 6, null, 4],
      [8, null, 2, null, null, null, null, null, null],
      [5, null, 9, 2, null, 1, null, 4, null],
      [null, null, null, null, null, null, null, null, 8],
      [null, null, null, null, null, 9, 1, null, null],
    ],
    solution: [
      [6, 5, 1, 9, 7, 8, 4, 2, 3],
      [2, 7, 8, 3, 4, 6, 5, 1, 9],
      [9, 3, 4, 1, 2, 5, 7, 8, 6],
      [1, 6, 3, 7, 9, 4, 8, 5, 2],
      [7, 9, 5, 8, 1, 2, 6, 3, 4],
      [8, 4, 2, 6, 5, 3, 9, 7, 1],
      [5, 8, 9, 2, 6, 1, 3, 4, 7],
      [4, 1, 6, 5, 3, 7, 2, 9, 8],
      [3, 2, 7, 4, 8, 9, 1, 6, 5],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleExtreme.PUZZLE_1,
    PuzzleExtreme.PUZZLE_2,
    PuzzleExtreme.PUZZLE_3,
    PuzzleExtreme.PUZZLE_4,
    PuzzleExtreme.PUZZLE_5,
    PuzzleExtreme.PUZZLE_6,
    PuzzleExtreme.PUZZLE_7,
  ];
}
