import { SudokuDropdownSelectionTestData } from "@app/components/sudoku-settings/state/sudoku-dropdown-selection-test-data";
import { SudokuPuzzleActions } from "@app/components/sudoku-settings/state/sudoku-puzzle.actions";
import { SudokuPuzzleState } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";
import { Puzzle9x9 } from "@app/test/puzzles/puzzle-9x9";
import { createFeature, createReducer, on } from "@ngrx/store";

export class SudokuPuzzleReducer {
  public static readonly featureKey = "sudokuPuzzle";

  public static readonly initialState: SudokuPuzzleState = {
    isConfirmed: false,
    height: 9,
    width: 9,
    selectionOptions: {
      options: SudokuDropdownSelectionTestData.ITEMS,
      selected: SudokuDropdownSelectionTestData.ITEMS[0],
    },
    sudoku: Puzzle9x9.EMPTY,
  };

  public static readonly reducer = createReducer(
    SudokuPuzzleReducer.initialState,
    on(SudokuPuzzleActions.loadSudokuPuzzles, (state) => state),
  );
}

export const sudokuPuzzleFeature = createFeature({
  name: SudokuPuzzleReducer.featureKey,
  reducer: SudokuPuzzleReducer.reducer,
});
