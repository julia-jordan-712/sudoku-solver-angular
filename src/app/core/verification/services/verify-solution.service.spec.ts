import { TestBed } from "@angular/core/testing";
import { VerifyNothingEmptyService } from "@app/core/verification/services/verify-nothing-empty.service";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerifySquareService } from "@app/core/verification/services/verify-square.service";
import { VerifyUniquenessService } from "@app/core/verification/services/verify-uniqueness.service";
import { VerificationOptions } from "@app/core/verification/types/verification-options";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

describe(VerifySolutionService.name, () => {
  let square: VerifySquareService;
  let uniqueness: VerifyUniquenessService;
  let notEmpty: VerifyNothingEmptyService;
  let underTest: VerifySolutionService;

  const ALLOW_EMPTY: VerificationOptions = { allowEmptyCells: true };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    square = TestBed.inject(VerifySquareService);
    uniqueness = TestBed.inject(VerifyUniquenessService);
    notEmpty = TestBed.inject(VerifyNothingEmptyService);
    underTest = TestBed.inject(VerifySolutionService);

    spyOn(square, "verify").and.callThrough();
    spyOn(uniqueness, "verify").and.callThrough();
    spyOn(notEmpty, "verify").and.callThrough();
  });

  [
    {
      input: Puzzle4x4.EMPTY,
      valid: true,
      desc: "empty solution",
    },
    {
      input: Puzzle4x4.EMPTY_ROW,
      valid: true,
      desc: "empty row",
    },
    {
      input: Puzzle4x4.INCOMPLETE_INVALID_ROW,
      valid: false,
      desc: "invalid row",
    },
    {
      input: Puzzle4x4.EMPTY_COLUMN,
      valid: true,
      desc: "empty column",
    },
    {
      input: Puzzle4x4.INCOMPLETE_INVALID_COLUMN,
      valid: false,
      desc: "invalid column",
    },
    {
      input: Puzzle4x4.EMPTY_SQUARE,
      valid: true,
      desc: "empty square",
    },
    {
      input: Puzzle4x4.INCOMPLETE_INVALID_SQUARE,
      valid: false,
      desc: "invalid square",
    },
    {
      input: PuzzleSimple.PUZZLE_1.puzzle,
      valid: true,
      desc: "PuzzleSimple.PUZZLE_1.puzzle",
    },
    {
      input: PuzzleSimple.PUZZLE_1.puzzle,
      valid: true,
      desc: "PuzzleSimple.PUZZLE_1.puzzle",
    },
  ].forEach((params) => {
    it(`should verify solution in default verification: ${params.desc}`, () => {
      expect(underTest.verify(params.input, ALLOW_EMPTY).isValid()).toEqual(
        params.valid,
      );
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
      expect(notEmpty.verify).toHaveBeenCalledTimes(1);
    });

    it(`should verify solution if only uniqueness is checked: ${params.desc}`, () => {
      const options = { ...ALLOW_EMPTY, size: params.input.length };

      expect(underTest.verify(params.input, options).isValid()).toEqual(
        params.valid,
      );
      expect(square.verify).not.toHaveBeenCalled();
      expect(notEmpty.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
    });

    it(`should verify solution if duplicates are not tracked: ${params.desc}`, () => {
      const options = { ...ALLOW_EMPTY, trackUniquenessViolations: false };
      expect(underTest.verify(params.input, options).isValid()).toEqual(
        params.valid,
      );
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(notEmpty.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledOnceWith(
        params.input,
        params.input.length,
        options,
      );
    });

    it(`should verify solution if duplicates are tracked: ${params.desc}`, () => {
      const options = { ...ALLOW_EMPTY, trackUniquenessViolations: true };
      expect(underTest.verify(params.input, options).isValid()).toEqual(
        params.valid,
      );
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(notEmpty.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledOnceWith(
        params.input,
        params.input.length,
        options,
      );
    });
  });

  it("should not verify the rest if squareness already failed", () => {
    const grid: SudokuGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [undefined, undefined, 4, 1],
      [undefined, undefined, 2, 3],
      [undefined, undefined, undefined, undefined],
    ];

    expect(underTest.verify(grid, ALLOW_EMPTY).isValid()).toBeFalse();
    expect(square.verify).toHaveBeenCalledTimes(1);
    expect(notEmpty.verify).not.toHaveBeenCalled();
    expect(uniqueness.verify).not.toHaveBeenCalled();
  });

  it("should not verify the rest if empty values are contained but not allowed already failed", () => {
    expect(
      underTest.verify(Puzzle4x4.EMPTY, { size: Puzzle4x4.length }).isValid(),
    ).toBeFalse();
    expect(square.verify).not.toHaveBeenCalled();
    expect(notEmpty.verify).toHaveBeenCalledTimes(1);
    expect(uniqueness.verify).not.toHaveBeenCalled();
  });

  [-10, -9, -5, -1, 0, 10, 11].forEach((invalidNumber) => {
    it(`should recognize invalid number ${invalidNumber} in a 4x4 Sudoku`, () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
      grid[0][0] = invalidNumber;

      expect(underTest.verify(grid).isValid()).toBeFalse();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(notEmpty.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
    });

    it(`should recognize invalid possible number ${invalidNumber} in a 4x4 Sudoku`, () => {
      const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
      grid[0][0] = [invalidNumber];

      expect(underTest.verify(grid).isValid()).toBeFalse();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(notEmpty.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
    });
  });
});
