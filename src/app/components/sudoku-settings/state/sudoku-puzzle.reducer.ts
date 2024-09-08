import { SudokuPuzzleActions } from "@app/components/sudoku-settings/state/sudoku-puzzle.actions";
import { SudokuPuzzleState } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";
import { createFeature, createReducer, on } from "@ngrx/store";

export class SudokuPuzzleReducer {
  public static readonly featureKey = "sudokuPuzzle";

  public static readonly initialState: SudokuPuzzleState = {};

  public static readonly reducer = createReducer(
    SudokuPuzzleReducer.initialState,
    on(SudokuPuzzleActions.loadSudokuPuzzles, (state) => state),
  );
}

export const sudokuPuzzleFeature = createFeature({
  name: SudokuPuzzleReducer.featureKey,
  reducer: SudokuPuzzleReducer.reducer,
});
