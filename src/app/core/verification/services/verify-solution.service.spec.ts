import { TestBed } from "@angular/core/testing";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerifySquareService } from "@app/core/verification/services/verify-square.service";
import { VerifyUniquenessService } from "@app/core/verification/services/verify-uniqueness.service";
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
      input: Puzzle4x4.EMPTY,
      desc: "empty solution",
    },
    {
      input: Puzzle4x4.EMPTY_ROW,
      desc: "empty row",
    },
    {
      input: Puzzle4x4.EMPTY_COLUMN,
      desc: "empty column",
    },
    {
      input: Puzzle4x4.EMPTY_SQUARE,
      desc: "empty square",
    },
    {
      input: PuzzleSimple.PUZZLE_1.solution,
      desc: "PuzzleSimple.PUZZLE_1.solution",
    },
    {
      input: PuzzleSimple.PUZZLE_1.puzzle,
      desc: "PuzzleSimple.PUZZLE_1.puzzle",
    },
  ].forEach((params) => {
    it(`should recognize a valid solution in default verification: ${params.desc}`, () => {
      expect(underTest.verify(params.input).isValid()).toBeTrue();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
    });

    it(`should recognize a valid solution if only uniqueness is checked: ${params.desc}`, () => {
      expect(
        underTest.verify(params.input, { size: params.input.length }).isValid(),
      ).toBeTrue();
      expect(square.verify).not.toHaveBeenCalled();
      expect(uniqueness.verify).toHaveBeenCalledTimes(1);
    });

    it(`should recognize a valid solution if duplicates are not tracked: ${params.desc}`, () => {
      expect(
        underTest
          .verify(params.input, { trackUniquenessViolations: false })
          .isValid(),
      ).toBeTrue();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledOnceWith(
        params.input,
        params.input.length,
        { trackUniquenessViolations: false },
      );
    });

    it(`should recognize a valid solution if duplicates are tracked: ${params.desc}`, () => {
      expect(
        underTest
          .verify(params.input, { trackUniquenessViolations: true })
          .isValid(),
      ).toBeTrue();
      expect(square.verify).toHaveBeenCalledTimes(1);
      expect(uniqueness.verify).toHaveBeenCalledOnceWith(
        params.input,
        params.input.length,
        { trackUniquenessViolations: true },
      );
    });
  });
});
