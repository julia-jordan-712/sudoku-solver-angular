import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppState } from "@app/state";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { EMPTY, Observable } from "rxjs";

export class TestState {
  public static mockStoreProviders = (config?: {
    initialState?: AppState;
    actions$?: Observable<any>;
  }) => [
    provideMockStore({
      initialState: config?.initialState ?? TestState.createTestAppState(),
    }),
    provideMockActions(config?.actions$ ?? EMPTY),
  ];

  public static createTestAppState(): AppState {
    return {
      [SudokuPuzzleReducer.featureKey]: this.createTestSudokuPuzzleState(),
    };
  }

  public static createTestSudokuPuzzleState(): SudokuPuzzleState {
    return {
      isConfirmed: false,
      sudoku: SudokuPuzzleSelectionTestData.ITEMS?.[0].grid,
      height: SudokuPuzzleSelectionTestData.ITEMS?.[0].grid?.length,
      width: SudokuPuzzleSelectionTestData.ITEMS?.[0].grid?.length,
      selectionOptions: {
        options: SudokuPuzzleSelectionTestData.ITEMS,
        selected: SudokuPuzzleSelectionTestData.ITEMS?.[0],
      },
    };
  }
}
