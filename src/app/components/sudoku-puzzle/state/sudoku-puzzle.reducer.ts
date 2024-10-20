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
    on(
      SudokuPuzzleActions.changeSettings,
      (state): SudokuPuzzleState => ({
        ...state,
        isConfirmed: false,
      }),
    ),
    on(
      SudokuPuzzleActions.clearSelectedOption,
      (state): SudokuPuzzleState => ({
        ...state,
        selectionOptions: { ...state.selectionOptions, selected: undefined },
      }),
    ),
    on(
      SudokuPuzzleActions.userSetSelectedOption,
      (state, action): SudokuPuzzleState => ({
        ...state,
        selectionOptions: {
          ...state.selectionOptions,
          selected: action.option,
        },
      }),
    ),
    on(
      SudokuPuzzleActions.setSize,
      (state, action): SudokuPuzzleState => ({
        ...state,
        height: action.height != undefined ? action.height : state.height,
        width: action.width != undefined ? action.width : state.width,
      }),
    ),
    on(
      SudokuPuzzleActions.setSudoku,
      (state, action): SudokuPuzzleState => ({
        ...state,
        sudoku: action.sudoku,
      }),
    ),
    on(
      SudokuPuzzleActions.submitSettings,
      (state): SudokuPuzzleState => ({
        ...state,
        isConfirmed: true,
      }),
    ),
  );
}

export const sudokuPuzzleFeature = createFeature({
  name: SudokuPuzzleReducer.featureKey,
  reducer: SudokuPuzzleReducer.reducer,
});
