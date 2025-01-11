import { TestPuzzle } from "@test/puzzles/test-puzzle";

export class PuzzleSimple {
  public static readonly PUZZLE_1: TestPuzzle = {
    puzzle: [
      [null, 8, null, 4, null, 9, 6, 5, 3],
      [6, 4, 2, 8, null, null, null, 7, null],
      [null, null, null, null, null, null, 8, null, null],
      [null, null, 7, null, null, 5, null, 4, 2],
      [null, null, null, 7, null, 1, null, null, null],
      [8, 5, null, 6, null, null, 1, null, null],
      [null, null, 6, null, null, null, null, null, null],
      [null, 1, null, null, null, 4, 7, 3, 6],
      [2, 7, 3, 5, null, 8, null, 1, null],
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
  public static readonly PUZZLE_2: TestPuzzle = {
    puzzle: [
      [6, 3, null, 2, null, 8, null, 1, null],
      [2, null, null, null, 5, null, null, 8, 9],
      [1, null, 9, null, 6, null, null, 3, null],
      [null, null, 8, null, null, 6, null, 5, null],
      [null, null, null, 1, 8, 7, null, null, null],
      [null, 6, null, 5, null, null, 9, null, null],
      [null, 9, null, null, 7, null, 1, null, 6],
      [8, 1, null, null, 2, null, null, null, 5],
      [null, 2, null, 4, null, 3, null, 9, 7],
    ],
    solution: [
      [6, 3, 5, 2, 9, 8, 7, 1, 4],
      [2, 7, 4, 3, 5, 1, 6, 8, 9],
      [1, 8, 9, 7, 6, 4, 5, 3, 2],
      [7, 4, 8, 9, 3, 6, 2, 5, 1],
      [9, 5, 2, 1, 8, 7, 4, 6, 3],
      [3, 6, 1, 5, 4, 2, 9, 7, 8],
      [4, 9, 3, 8, 7, 5, 1, 2, 6],
      [8, 1, 7, 6, 2, 9, 3, 4, 5],
      [5, 2, 6, 4, 1, 3, 8, 9, 7],
    ],
  };
  public static readonly PUZZLE_3: TestPuzzle = {
    puzzle: [
      [null, null, null, 1, null, null, null, 4, null],
      [1, 9, 5, null, null, 8, null, null, null],
      [3, 4, null, null, 2, null, 1, null, 9],
      [null, null, null, 9, 1, null, 5, null, null],
      [6, null, 9, 8, null, 2, 4, null, 7],
      [null, null, 1, null, 3, 4, null, null, null],
      [2, null, 8, null, 4, null, null, 7, 1],
      [null, null, null, 7, null, null, 8, 3, 2],
      [null, 1, null, null, null, 9, null, null, null],
    ],
    solution: [
      [8, 2, 6, 1, 9, 3, 7, 4, 5],
      [1, 9, 5, 4, 7, 8, 3, 2, 6],
      [3, 4, 7, 5, 2, 6, 1, 8, 9],
      [4, 8, 2, 9, 1, 7, 5, 6, 3],
      [6, 3, 9, 8, 5, 2, 4, 1, 7],
      [5, 7, 1, 6, 3, 4, 2, 9, 8],
      [2, 6, 8, 3, 4, 5, 9, 7, 1],
      [9, 5, 4, 7, 6, 1, 8, 3, 2],
      [7, 1, 3, 2, 8, 9, 6, 5, 4],
    ],
  };
  public static readonly PUZZLE_4: TestPuzzle = {
    puzzle: [
      [null, null, 7, null, null, null, null, 6, 3],
      [8, null, 4, 6, 7, null, 9, null, null],
      [null, 1, null, null, 3, 9, null, null, 2],
      [null, null, 3, 7, null, null, 6, null, null],
      [7, null, null, 4, null, 1, null, null, 5],
      [null, null, 8, null, null, 6, 1, null, null],
      [6, null, null, 2, 1, null, null, 9, null],
      [null, null, 1, null, 6, 3, 5, null, 8],
      [3, 9, null, null, null, null, 7, null, null],
    ],
    solution: [
      [9, 2, 7, 1, 5, 4, 8, 6, 3],
      [8, 3, 4, 6, 7, 2, 9, 5, 1],
      [5, 1, 6, 8, 3, 9, 4, 7, 2],
      [1, 4, 3, 7, 2, 5, 6, 8, 9],
      [7, 6, 9, 4, 8, 1, 2, 3, 5],
      [2, 5, 8, 3, 9, 6, 1, 4, 7],
      [6, 8, 5, 2, 1, 7, 3, 9, 4],
      [4, 7, 1, 9, 6, 3, 5, 2, 8],
      [3, 9, 2, 5, 4, 8, 7, 1, 6],
    ],
  };
  public static readonly PUZZLE_5: TestPuzzle = {
    puzzle: [
      [9, 8, 1, null, null, null, 7, null, null],
      [3, null, 7, 1, 9, null, null, 8, null],
      [null, null, 4, null, 8, 2, null, null, null],
      [7, null, null, 6, null, null, 3, 9, null],
      [2, null, null, null, null, null, null, null, 7],
      [null, 1, 3, null, null, 7, null, null, 5],
      [null, null, null, 3, 5, null, 2, null, null],
      [null, 6, null, null, 1, 4, 8, null, 3],
      [null, null, 2, null, null, null, 5, 6, 4],
    ],
    solution: [
      [9, 8, 1, 4, 6, 3, 7, 5, 2],
      [3, 2, 7, 1, 9, 5, 4, 8, 6],
      [6, 5, 4, 7, 8, 2, 9, 3, 1],
      [7, 4, 5, 6, 2, 1, 3, 9, 8],
      [2, 9, 6, 5, 3, 8, 1, 4, 7],
      [8, 1, 3, 9, 4, 7, 6, 2, 5],
      [4, 7, 8, 3, 5, 6, 2, 1, 9],
      [5, 6, 9, 2, 1, 4, 8, 7, 3],
      [1, 3, 2, 8, 7, 9, 5, 6, 4],
    ],
  };

  public static readonly PUZZLES: TestPuzzle[] = [
    PuzzleSimple.PUZZLE_1,
    PuzzleSimple.PUZZLE_2,
    PuzzleSimple.PUZZLE_3,
    PuzzleSimple.PUZZLE_4,
    PuzzleSimple.PUZZLE_5,
  ];
}
