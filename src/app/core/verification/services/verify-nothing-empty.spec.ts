import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { VerifyNothingEmpty } from "./verify-nothing-empty";

describe(VerifyNothingEmpty.name, () => {
  describe("invalid", () => {
    it("should be invalid if all cells are undefined", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.EMPTY).verify().isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a row contains all undefined values", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.EMPTY_COLUMN).verify().isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a column contains all undefined values", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.EMPTY_COLUMN).verify().isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a square contains all undefined values", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.EMPTY_SQUARE).verify().isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a single cell is undefined", () => {
      const sudokuWithUndefinedCell = SudokuGridUtil.clone(Puzzle4x4.COMPLETE);
      sudokuWithUndefinedCell[2][3] = undefined;
      expect(
        new VerifyNothingEmpty(sudokuWithUndefinedCell).verify().isValid(),
      ).toBeFalse();
    });

    it("should be invalid if a single cell contains an empty array", () => {
      const sudokuWithCellWithEmptyArray = SudokuGridUtil.clone(
        Puzzle4x4.COMPLETE,
      );
      sudokuWithCellWithEmptyArray[2][3] = [];
      expect(
        new VerifyNothingEmpty(sudokuWithCellWithEmptyArray).verify().isValid(),
      ).toBeFalse();
    });
  });

  describe("valid", () => {
    it("should be valid if all cells contain a value", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.COMPLETE).verify().isValid(),
      ).toBeTrue();
    });

    it("should be valid if all cells contain an array of values", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.INCOMPLETE_ALL_VALUES)
          .verify()
          .isValid(),
      ).toBeTrue();
    });

    it("should not skip validation if options do not specify whether empty values are allowed", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.EMPTY)
          .verify({ allowEmptyCells: undefined })
          .isValid(),
      ).toBeFalse();
    });

    it("should skip validation if options allow empty values", () => {
      expect(
        new VerifyNothingEmpty(Puzzle4x4.EMPTY)
          .verify({ allowEmptyCells: true })
          .isValid(),
      ).toBeTrue();
    });
  });
});
