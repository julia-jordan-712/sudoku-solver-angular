import { SudokuGridCellValidator } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.validator";
import { Nullable } from "@app/types/nullable";

describe(SudokuGridCellValidator.name, () => {
  describe("max value 10", () => {
    [
      { value: null, valid: true },
      { value: undefined, valid: true },
      { value: NaN, valid: false },
      { value: Number.MIN_SAFE_INTEGER, valid: false },
      { value: -1, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: true },
      { value: 9, valid: true },
      { value: 10, valid: true },
      { value: 11, valid: false },
    ].forEach((params) => {
      executeTest(params.valid, params.value, 10);
    });
  });

  describe("max value 1", () => {
    [
      { value: null, valid: true },
      { value: undefined, valid: true },
      { value: NaN, valid: false },
      { value: Number.MIN_SAFE_INTEGER, valid: false },
      { value: -1, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: true },
      { value: 2, valid: false },
    ].forEach((params) => {
      executeTest(params.valid, params.value, 1);
    });
  });

  describe("max value 0", () => {
    [
      { value: null, valid: true },
      { value: undefined, valid: true },
      { value: NaN, valid: false },
      { value: Number.MIN_SAFE_INTEGER, valid: false },
      { value: -1, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: false },
    ].forEach((params) => {
      executeTest(params.valid, params.value, 0);
    });
  });

  describe("NO max value", () => {
    [
      { value: null, valid: true },
      { value: undefined, valid: true },
      { value: NaN, valid: false },
      { value: Number.MIN_SAFE_INTEGER, valid: false },
      { value: -1, valid: false },
      { value: 0, valid: false },
      { value: 1, valid: true },
      { value: Number.MAX_SAFE_INTEGER, valid: true },
    ].forEach((params) => {
      executeTest(params.valid, params.value, null);
    });
  });
});

function executeTest(
  valid: boolean,
  value: Nullable<number>,
  maxValue: number | null,
): void {
  it(`should be ${valid ? "VALID" : "INVALID"} for value '${value}'`, () => {
    const validator: SudokuGridCellValidator = new SudokuGridCellValidator();
    validator.setMaxValue(maxValue);
    expect(validator.isValid(value)).toEqual(valid);
  });
}
