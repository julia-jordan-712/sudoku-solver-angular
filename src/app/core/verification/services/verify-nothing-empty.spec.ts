import { VerifyNothingEmpty } from "@app/core/verification/services/verify-nothing-empty";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";

describe(VerifyNothingEmpty.name, () => {
  describe("invalid", () => {
    it("should be invalid if all cells are undefined", () => {
      expect(
        new VerifyNothingEmpty().verify(Puzzle4x4.EMPTY).isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a row contains all undefined values", () => {
      expect(
        new VerifyNothingEmpty().verify(Puzzle4x4.EMPTY_COLUMN).isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a column contains all undefined values", () => {
      expect(
        new VerifyNothingEmpty().verify(Puzzle4x4.EMPTY_COLUMN).isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a square contains all undefined values", () => {
      expect(
        new VerifyNothingEmpty().verify(Puzzle4x4.EMPTY_SQUARE).isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a single cell is undefined", () => {
      const sudokuWithUndefinedCell = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
      sudokuWithUndefinedCell[2][3] = undefined;
      expect(
        new VerifyNothingEmpty().verify(sudokuWithUndefinedCell).isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a single cell contains an empty array", () => {
      const sudokuWithCellWithEmptyArray = SudokuGridUtil.clone(
        Puzzle4x4.COMPLETE,
      );
      sudokuWithCellWithEmptyArray[2][3] = [];
      expect(
        new VerifyNothingEmpty().verify(sudokuWithCellWithEmptyArray).isValid(),
      ).toBeFalse();
    });
  });

  describe("valid", () => {
    it("should be valid if all cells contain a value", () => {
      expect(
        new VerifyNothingEmpty().verify(Puzzle4x4.COMPLETE).isValid(),
      ).toBeTrue();
    });

    it("should be valid if all cells contain an array of values", () => {
      expect(
        new VerifyNothingEmpty()
          .verify(Puzzle4x4.INCOMPLETE_ALL_VALUES)

          .isValid(),
      ).toBeTrue();
    });

    it("should not skip validation if options do not specify whether empty values are allowed", () => {
      expect(
        new VerifyNothingEmpty()
          .verify(Puzzle4x4.EMPTY, { allowEmptyCells: undefined })
          .isValid(),
      ).toBeFalse();
    });

    it("should skip validation if options allow empty values", () => {
      expect(
        new VerifyNothingEmpty()
          .verify(Puzzle4x4.EMPTY, { allowEmptyCells: true })
          .isValid(),
      ).toBeTrue();
    });
  });
});
