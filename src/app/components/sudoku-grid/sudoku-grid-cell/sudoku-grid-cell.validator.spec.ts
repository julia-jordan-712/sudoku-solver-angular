import { SudokuGridCellValidator } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.validator";

describe(SudokuGridCellValidator.name, () => {
  it("should create an instance", () => {
    expect(new SudokuGridCellValidator()).toBeTruthy();
  });
});
