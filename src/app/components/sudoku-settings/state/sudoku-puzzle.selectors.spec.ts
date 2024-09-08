import { SudokuPuzzleReducer } from "@app/components/sudoku-settings/state/sudoku-puzzle.reducer";
import { selectSudokuPuzzleState } from "@app/components/sudoku-settings/state/sudoku-puzzle.selectors";
import { SudokuPuzzleState } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";

describe("SudokuPuzzle Selectors", () => {
  it("should select the feature state", () => {
    const result = selectSudokuPuzzleState({
      [SudokuPuzzleReducer.featureKey]: {},
    });

    expect(result).toEqual({} as SudokuPuzzleState);
  });
});
