import { TestBed } from "@angular/core/testing";
import { SudokuPuzzleGridUpdateService } from "@app/components/sudoku-puzzle/services/sudoku-puzzle-grid-update.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Puzzle4x4 } from "src/test/puzzles/puzzle-4x4";

describe(SudokuPuzzleGridUpdateService.name, () => {
  let service: SudokuPuzzleGridUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuPuzzleGridUpdateService);
  });

  [
    {
      title: "should increase empty grid in height only",
      input: {
        grid: [],
        height: 3,
      },
      expected: {
        height: 3,
        width: 0,
      },
    },
    {
      title: "should NOT increase empty grid in width only",
      input: {
        grid: [],
        width: 3,
      },
      expected: {
        height: 0,
        width: 0,
      },
    },
    {
      title: "should increase empty grid in height AND width",
      input: {
        grid: [],
        height: 3,
        width: 2,
      },
      expected: {
        height: 3,
        width: 2,
      },
    },
    {
      title: "should increase existing grid in height only",
      input: {
        grid: Puzzle4x4.EMPTY,
        height: 6,
      },
      expected: {
        height: 6,
        width: 4,
      },
    },
    {
      title: "should increase existing grid in width only",
      input: {
        grid: Puzzle4x4.EMPTY,
        width: 6,
      },
      expected: {
        height: 4,
        width: 6,
      },
    },
    {
      title: "should increase existing grid in height AND width",
      input: {
        grid: Puzzle4x4.EMPTY,
        height: 6,
        width: 7,
      },
      expected: {
        height: 6,
        width: 7,
      },
    },
    {
      title: "should reduce existing grid in height only",
      input: {
        grid: Puzzle4x4.EMPTY,
        height: 1,
      },
      expected: {
        height: 1,
        width: 4,
      },
    },
    {
      title: "should reduce existing grid in width only",
      input: {
        grid: Puzzle4x4.EMPTY,
        width: 2,
      },
      expected: {
        height: 4,
        width: 2,
      },
    },
    {
      title: "should reduce existing grid in height AND width",
      input: {
        grid: Puzzle4x4.EMPTY,
        height: 3,
        width: 2,
      },
      expected: {
        height: 3,
        width: 2,
      },
    },
    {
      title: "should be able to reduce height (and thus width as well) to zero",
      input: {
        grid: Puzzle4x4.EMPTY,
        height: 0,
      },
      expected: {
        height: 0,
        width: 0,
      },
    },
    {
      title: "should be able to reduce width only to zero",
      input: {
        grid: Puzzle4x4.EMPTY,
        width: 0,
      },
      expected: {
        height: 4,
        width: 0,
      },
    },
  ].forEach((params) => {
    it(params.title, () => {
      const result: SudokuGrid = service.updateGrid(
        params.input.grid,
        params.input.height,
        params.input.width,
      );
      expect(result.length).toEqual(params.expected.height);
      for (let i = 0; i < params.expected.height; i++) {
        expect(result[i].length).toEqual(params.expected.width);
      }
    });
  });

  it("should add new rows and columns to the end and not change existing cell values", () => {
    const result: SudokuGrid = service.updateGrid(Puzzle4x4.COMPLETE, 5, 5);
    const expected: SudokuGrid = [
      [1, 2, 3, 4, null],
      [3, 4, 1, 2, null],
      [2, 3, 4, 1, null],
      [4, 1, 2, 3, null],
      [null, null, null, null, null],
    ];

    // expect existing cell values to be unchanged
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        expect(result[i][j]).toEqual(expected[i][j]);
      }
    }
  });
});
