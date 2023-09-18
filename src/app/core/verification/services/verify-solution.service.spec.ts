import { TestBed } from "@angular/core/testing";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerifySquareService } from "@app/core/verification/services/verify-square.service";
import { VerifyUniquenessService } from "@app/core/verification/services/verify-uniqueness.service";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

describe(VerifySolutionService.name, () => {
  let square: VerifySquareService;
  let uniqueness: VerifyUniquenessService;
  let underTest: VerifySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    square = TestBed.inject(VerifySquareService);
    uniqueness = TestBed.inject(VerifyUniquenessService);
    underTest = TestBed.inject(VerifySolutionService);

    spyOn(square, "verify").and.callThrough();
    spyOn(uniqueness, "verify").and.callThrough();
  });

  [
    {
      valid: Puzzle4x4.EMPTY,
      desc: "empty solution",
    },
    {
      valid: Puzzle4x4.EMPTY_ROW,
      invalid: Puzzle4x4.INCOMPLETE_INVALID_ROW,
      desc: "empty/invalid row",
    },
    {
      valid: Puzzle4x4.EMPTY_COLUMN,
      invalid: Puzzle4x4.INCOMPLETE_INVALID_COLUMN,
      desc: "empty/invalid column",
    },
    {
      valid: Puzzle4x4.EMPTY_SQUARE,
      invalid: Puzzle4x4.INCOMPLETE_INVALID_SQUARE,
      desc: "empty/invalid square",
    },
    {
      valid: PuzzleSimple.PUZZLE_1.puzzle,
      desc: "PuzzleSimple.PUZZLE_1.puzzle",
    },
    {
      valid: PuzzleSimple.PUZZLE_1.puzzle,
      desc: "PuzzleSimple.PUZZLE_1.puzzle",
    },
  ].forEach((params) => {
    it(`should verify solution in default verification: ${params.desc}`, () => {
      expect(underTest.verify(params.valid).isValid()).toBeTrue();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);

      if (params.invalid) {
        expect(underTest.verify(params.invalid).isValid()).toBeFalse();
        expect(square.verify).toHaveBeenCalledTimes(2);
        expect(uniqueness.verify).toHaveBeenCalledTimes(2);
      }
    });

    it(`should verify solution if only uniqueness is checked: ${params.desc}`, () => {
      const options = { size: params.valid.length };

      expect(underTest.verify(params.valid, options).isValid()).toBeTrue();
      expect(square.verify).not.toHaveBeenCalled();
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);

      if (params.invalid) {
        expect(underTest.verify(params.invalid, options).isValid()).toBeFalse();
        expect(square.verify).not.toHaveBeenCalled();
        expect(uniqueness.verify).toHaveBeenCalledTimes(2);
      }
    });

    it(`should verify solution if duplicates are not tracked: ${params.desc}`, () => {
      const options = { trackUniquenessViolations: false };
      expect(underTest.verify(params.valid, options).isValid()).toBeTrue();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledOnceWith(
        params.valid,
        params.valid.length,
        options,
      );

      if (params.invalid) {
        expect(underTest.verify(params.invalid, options).isValid()).toBeFalse();
        expect(square.verify).toHaveBeenCalledTimes(2);
        expect(uniqueness.verify).toHaveBeenCalledTimes(2);
      }
    });

    it(`should verify solution if duplicates are tracked: ${params.desc}`, () => {
      const options = { trackUniquenessViolations: true };
      expect(underTest.verify(params.valid, options).isValid()).toBeTrue();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledOnceWith(
        params.valid,
        params.valid.length,
        options,
      );

      if (params.invalid) {
        expect(underTest.verify(params.invalid, options).isValid()).toBeFalse();
        expect(square.verify).toHaveBeenCalledTimes(2);
        expect(uniqueness.verify).toHaveBeenCalledTimes(2);
      }
    });
  });

  it("should not verify uniqueness if squareness already failed", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [undefined, undefined, 4, 1],
      [undefined, undefined, 2, 3],
      [undefined, undefined, undefined, undefined],
    ];

    expect(underTest.verify(grid).isValid()).toBeFalse();
    expect(square.verify).toHaveBeenCalledTimes(1);
    expect(uniqueness.verify).not.toHaveBeenCalled();
  });

  [-10, -9, -5, -1, 0, 10, 11].forEach((invalidNumber) => {
    it(`should recognize invalid number ${invalidNumber} in a 4x4 Sudoku`, () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
      grid[0][0] = invalidNumber;

      expect(underTest.verify(grid).isValid()).toBeFalse();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
    });
  });
});
