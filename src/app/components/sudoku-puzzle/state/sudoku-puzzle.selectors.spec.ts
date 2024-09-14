import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleSelectors } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.selectors";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";

describe("SudokuPuzzle Selectors", () => {
  it("should select the feature state", () => {
    const result: SudokuPuzzleState = SudokuPuzzleSelectors.selectState({
      [SudokuPuzzleReducer.featureKey]: {},
    });

    expect(result).toEqual({} as SudokuPuzzleState);
  });
});
