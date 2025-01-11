import { Injectable } from "@angular/core";
import { DevFunctionActions } from "@app/components/development-functions/state/dev-functions.actions";
import { DevFunctionsState } from "@app/components/development-functions/state/dev-functions.state";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppActions } from "@app/state/app-state";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class DevFunctionsReducer {
  private createInitialState(): DevFunctionsState {
    const items: SudokuDropdownSelectionItem[] = [
      ...SudokuPuzzleSelectionTestData.createItems(),
    ];
    return {
      isDev: !environment.production,
      testSudokus: {
        options: items,
        selectedId: null,
      },
    };
  }

  getReducer(): ActionReducer<DevFunctionsState> {
    return createReducer(
      this.createInitialState(),
      on(
        AppActions.reinitialize,
        (_state, _action): DevFunctionsState => this.createInitialState(),
      ),
      on(
        AppActions.initFromState,
        (_state, _action): DevFunctionsState => this.createInitialState(),
      ),
      on(
        DevFunctionActions.hide,
        (state, _action): DevFunctionsState => ({ ...state, isDev: false }),
      ),
      on(
        DevFunctionActions.setTestSudoku,
        (state, action): DevFunctionsState => ({
          ...state,
          testSudokus: {
            ...state.testSudokus,
            selectedId: action.sudoku?.id,
          },
        }),
      ),
    );
  }
}
