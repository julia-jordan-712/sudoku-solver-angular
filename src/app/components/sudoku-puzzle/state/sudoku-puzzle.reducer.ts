import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { createFeature, createReducer, on } from "@ngrx/store";

export class SudokuPuzzleReducer {
  public static readonly featureKey = "sudokuPuzzle";

  public static readonly initialState: SudokuPuzzleState = {
    isConfirmed: false,
    sudoku: SudokuPuzzleSelectionTestData.ITEMS?.[0].grid,
    height: SudokuPuzzleSelectionTestData.ITEMS?.[0].grid?.length,
    width: SudokuPuzzleSelectionTestData.ITEMS?.[0].grid?.length,
    selectionOptions: {
      options: SudokuPuzzleSelectionTestData.ITEMS,
      selected: SudokuPuzzleSelectionTestData.ITEMS?.[0],
    },
  };

  public static readonly reducer = createReducer(
    SudokuPuzzleReducer.initialState,
    on(SudokuPuzzleActions.clearSelectedOption, (state, _) => ({
      ...state,
      selectionOptions: { ...state.selectionOptions, selected: undefined },
    })),
    on(SudokuPuzzleActions.setConfirmed, (state, action) => ({
      ...state,
      isConfirmed: action.confirmed,
    })),
    on(SudokuPuzzleActions.setHeight, (state, action) => ({
      ...state,
      height: action.height,
    })),
    on(SudokuPuzzleActions.setSelectedOption, (state, action) => ({
      ...state,
      selectionOptions: {
        ...state.selectionOptions,
        selected: action.option,
      },
    })),
    on(SudokuPuzzleActions.setSudoku, (state, action) => ({
      ...state,
      sudoku: action.sudoku,
    })),
    on(SudokuPuzzleActions.setWidth, (state, action) => ({
      ...state,
      width: action.width,
    })),
  );
}

export const sudokuPuzzleFeature = createFeature({
  name: SudokuPuzzleReducer.featureKey,
  reducer: SudokuPuzzleReducer.reducer,
});