import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";

export class SudokuGridViewModelMock {
  public static DATA: SudokuGridViewModel["data"] = {
    branchInfo: { id: "test-id", isCurrent: true },
    verificationResult: null,
    highlightChangedCells: false,
  };
}
