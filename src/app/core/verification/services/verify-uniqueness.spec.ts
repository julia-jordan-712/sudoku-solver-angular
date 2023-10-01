import { VerifyUniqueness } from "@app/core/verification/services/verify-uniqueness";
import { VerificationDuplicates } from "@app/core/verification/types/verification-duplicates";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { CellPosition } from "@app/shared/types/cell-position";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Objects } from "@app/shared/util/objects";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

describe(VerifyUniqueness.name, () => {
  describe("complete solution", () => {
    [
      { input: Puzzle4x4.COMPLETE, desc: "Puzzle4x4.COMPLETE" },
      {
        input: PuzzleSimple.PUZZLE_1.solution,
        desc: "PuzzleSimple.PUZZLE_1.solution",
      },
    ].forEach((params) => {
      it(`should recognize a valid solution: ${
        params.desc ? params.desc : JSON.stringify(params.input)
      }`, () => {
        expect(
          new VerifyUniqueness(params.input, params.input.length)
            .verify()
            .isValid(),
        ).toBeTrue();
      });
    });

    describe("duplicate elements", () => {
      const duplicateElements = [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 3, 2, 3],
      ];

      it("should recognize duplicate elements but not track their positions by default", () => {
        const result = new VerifyUniqueness(duplicateElements, 4).verify();
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors().length).toEqual(1);
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS,
        );
        expect(result.hasTrackedDuplicates()).toBeFalse();
        expect(result.getDuplicatesPerValue()).toEqual({});
      });

      it("should find duplicate element positions when they are tracked", () => {
        const result = new VerifyUniqueness(duplicateElements, 4).verify({
          trackUniquenessViolations: true,
        });
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors().length).toEqual(1);
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS,
        );
        const duplicates: VerificationDuplicates =
          uniqueCellPositionIndex(result);
        expect(Object.keys(duplicates).length).toEqual(1);
        expect(duplicates["3"].length).toEqual(3);
        expect(duplicates["3"]).toContain(new CellPosition(2, 1));
        expect(duplicates["3"]).toContain(new CellPosition(3, 1));
        expect(duplicates["3"]).toContain(new CellPosition(3, 3));
      });
    });
  });

  describe("incomplete solution", () => {
    [
      {
        input: [
          [1, 2, 3, 4],
          [3, , 1, 2],
          [2, 3, , 1],
          [4, 1, 2, 3],
        ],
      },
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
        input: PuzzleSimple.PUZZLE_1.puzzle,
        desc: "PuzzleSimple.PUZZLE_1.puzzle",
      },
    ].forEach((params) => {
      it(`should recognize a valid solution when duplicates are not tracked: ${
        params.desc ? params.desc : JSON.stringify(params.input)
      }`, () => {
        const result = new VerifyUniqueness(
          params.input,
          params.input.length,
        ).verify();
        expect(result.isValid()).toBeTrue();
        expect(result.getErrors()).toEqual([]);
      });

      it(`should recognize a valid solution when duplicates are tracked: ${
        params.desc ? params.desc : JSON.stringify(params.input)
      }`, () => {
        const result = new VerifyUniqueness(
          params.input,
          params.input.length,
        ).verify({ trackUniquenessViolations: true });
        expect(result.isValid()).toBeTrue();
        expect(result.getErrors()).toEqual([]);
      });
    });

    [
      {
        input: Puzzle4x4.INCOMPLETE_INVALID_ROW,
        title: "should recognize duplicate elements in rows",
        positions: [new CellPosition(0, 0), new CellPosition(0, 3)],
      },
      {
        input: Puzzle4x4.INCOMPLETE_INVALID_COLUMN,
        title: "should recognize duplicate elements in columns",
        positions: [new CellPosition(0, 0), new CellPosition(3, 0)],
      },
      {
        input: Puzzle4x4.INCOMPLETE_INVALID_SQUARE,
        title: "should recognize duplicate elements in squares",
        positions: [new CellPosition(2, 1), new CellPosition(3, 0)],
      },
    ].forEach((params) => {
      it(`${params.title} when duplicates are not tracked`, () => {
        const result = new VerifyUniqueness(
          params.input,
          params.input.length,
        ).verify();
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors().length).toEqual(1);
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS,
        );
      });

      it(`${params.title} when duplicates are tracked`, () => {
        const result = new VerifyUniqueness(
          params.input,
          params.input.length,
        ).verify({ trackUniquenessViolations: true });
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors().length).toEqual(1);
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS,
        );

        const duplicates: VerificationDuplicates =
          uniqueCellPositionIndex(result);
        expect(Object.keys(duplicates).length).toEqual(1);
        expect(duplicates["4"].length).toEqual(params.positions.length);
        params.positions.forEach((position) => {
          expect(duplicates["4"]).toContain(position);
        });
      });
    });
  });

  describe("invalid numbers", () => {
    [-10, -9, -5, -1, 0, 10, 11].forEach((invalidNumber) => {
      it(`should recognize invalid number ${invalidNumber} in a 4x4 Sudoku when tracking uniqueness`, () => {
        const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
        grid[0][0] = invalidNumber;

        const result = new VerifyUniqueness(grid, 4).verify({
          trackUniquenessViolations: true,
        });
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_INVALID_NUMBERS(4),
        );
      });

      it(`should recognize invalid number ${invalidNumber} in a 4x4 Sudoku when not tracking uniqueness`, () => {
        const grid: SudokuGrid = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
        grid[0][0] = invalidNumber;

        const result = new VerifyUniqueness(grid, 4).verify({
          trackUniquenessViolations: false,
        });
        expect(result.isValid()).toBeFalse();
        expect(result.getErrors()[0]).toEqual(
          VerifyI18nKey.ERROR_INVALID_NUMBERS(4),
        );
      });
    });
  });

  describe("number notes", () => {
    const invalid = [
      [[-5, -4 - 1, 0, 5, 6], 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, [3, 4]],
    ];

    it("should ignore invalid numbers and duplicates in notes when tracking uniqueness", () => {
      const result = new VerifyUniqueness(invalid, 4).verify({
        trackUniquenessViolations: true,
      });
      expect(result.isValid()).toBeTrue();
      expect(result.getErrors()).toEqual([]);
    });

    it("should ignore invalid numbers and duplicates in notes when not tracking uniqueness", () => {
      const result = new VerifyUniqueness(invalid, 4).verify({
        trackUniquenessViolations: false,
      });
      expect(result.isValid()).toBeTrue();
      expect(result.getErrors()).toEqual([]);
    });
  });

  function uniqueCellPositionIndex(
    result: VerificationResult,
  ): VerificationDuplicates {
    return Objects.uniqueArrayIndex(result.getDuplicatesPerValue(), (a, b) =>
      a.equals(b),
    );
  }
});
