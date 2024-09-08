import { SudokuPuzzleReducer } from "@app/components/sudoku-settings/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";
import { createFeatureSelector } from "@ngrx/store";

export const selectSudokuPuzzleState = createFeatureSelector<SudokuPuzzleState>(
  SudokuPuzzleReducer.featureKey,
);
