import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppState } from "@app/state/app-state";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { Puzzle4x4 } from "src/test/puzzles/puzzle-4x4";
import { TestState } from "src/test/state/test-state";

describe("SudokuPuzzle Selectors", () => {
  it("should select the feature state", () => {
    const testState = TestState.createTestAppState();

    const result: SudokuPuzzleState =
      SudokuPuzzleSelectors.selectState(testState);

    expect(result).toEqual(testState.sudokuPuzzle);
  });

  describe("verify solution", () => {
    it("should verify solution", () => {
      // arrange
      const testState = createTestStateWithGrid(Puzzle4x4.COMPLETE);

      const result: SudokuGridViewModel | null =
        SudokuPuzzleSelectors.selectViewModel(testState);

      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeTrue();
    });

    it("should consider duplicates as invalid", () => {
      // arrange
      const testState = createTestStateWithGrid([
        [1, 2, 3, 4],
        [3, 1, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ]);

      // act
      const result: SudokuGridViewModel | null =
        SudokuPuzzleSelectors.selectViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeFalse();
      expect(result?.data.verificationResult?.getErrors()).toContain({
        key: "VERIFY.ERROR.DUPLICATE_ELEMENTS",
      });
    });

    it("should consider unsupported size as invalid", () => {
      // arrange
      const testState = createTestStateWithGrid([
        [1, 2, 3],
        [3, 4, 1],
        [2, 3, 4],
        [4, 1, 2],
      ]);

      // act
      const result: SudokuGridViewModel | null =
        SudokuPuzzleSelectors.selectViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeFalse();
      expect(result?.data.verificationResult?.getErrors()).toContain({
        key: "VERIFY.ERROR.NOT_A_SQUARE",
      });
    });

    it("should consider cells with empty array as valid", () => {
      // arrange
      const testState = createTestStateWithGrid([
        [1, 2, 3, 4],
        [3, [], 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ]);

      // act
      const result: SudokuGridViewModel | null =
        SudokuPuzzleSelectors.selectViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeTrue();
    });

    it("should consider undefined cells as valid", () => {
      // arrange
      const testState = createTestStateWithGrid(Puzzle4x4.EMPTY);

      // act
      const result: SudokuGridViewModel | null =
        SudokuPuzzleSelectors.selectViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeTrue();
    });
  });

  describe("sudoku view model", () => {
    it("should have correct max value in each cell", () => {
      const testState = createTestStateWithGrid(Puzzle4x4.EMPTY);

      const viewModel: Nullable<SudokuGridViewModel> =
        SudokuPuzzleSelectors.selectViewModel(testState)!;

      viewModel?.rows
        .flatMap((row) => row.cells.map((cell) => cell.data.maxValue))
        .forEach((maxValue) => expect(maxValue).toEqual(4));
    });

    it("should NOT highlight changed cells", () => {
      expect(
        SudokuPuzzleSelectors.selectViewModel(
          createTestStateWithGrid(Puzzle4x4.EMPTY),
        )?.data.highlightChangedCells,
      ).toBeFalse();
    });

    it("should NOT contain information about the previous grid", () => {
      const testState = createTestStateWithGrid(Puzzle4x4.COMPLETE);

      const viewModel: Nullable<SudokuGridViewModel> =
        SudokuPuzzleSelectors.selectViewModel(testState)!;

      viewModel?.rows
        .flatMap((row) => row.cells.map((cell) => cell.previous))
        .forEach((previous) => expect(previous).toBeUndefined());
    });
  });

  function createTestStateWithGrid(grid: SudokuGrid): AppState {
    const testState = TestState.createTestAppState();
    testState.sudokuPuzzle.sudoku = grid;
    return testState;
  }
});
