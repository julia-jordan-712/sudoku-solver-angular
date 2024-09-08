import { SudokuDropdownSelectionTestData } from "@app/components/sudoku-settings/state/sudoku-dropdown-selection-test-data";
import { SudokuPuzzleReducer } from "@app/components/sudoku-settings/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";
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
      sudoku: SudokuDropdownSelectionTestData.ITEMS?.[0].grid,
      height: SudokuDropdownSelectionTestData.ITEMS?.[0].grid?.length,
      width: SudokuDropdownSelectionTestData.ITEMS?.[0].grid?.length,
      selectionOptions: {
        options: SudokuDropdownSelectionTestData.ITEMS,
        selected: SudokuDropdownSelectionTestData.ITEMS?.[0],
      },
    };
  }
}
