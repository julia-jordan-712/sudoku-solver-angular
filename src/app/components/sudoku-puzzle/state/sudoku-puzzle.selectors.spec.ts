import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { TestState } from "@app/test/state/test-state";

describe("SudokuPuzzle Selectors", () => {
  it("should select the feature state", () => {
    const testState = TestState.createTestAppState();

    const result: SudokuPuzzleState =
      SudokuPuzzleSelectors.selectState(testState);

    expect(result).toEqual(testState.sudokuPuzzle);
  });
});
