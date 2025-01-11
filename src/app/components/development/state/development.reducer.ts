import { Injectable } from "@angular/core";
import { DevelopmentActions } from "./development.actions";
import { DevelopmentState } from "./development.state";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppActions } from "@app/state/app-state";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: "root" })
export class DevelopmentReducer {
  private createInitialState(): DevelopmentState {
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

  getReducer(): ActionReducer<DevelopmentState> {
    return createReducer(
      this.createInitialState(),
      on(
        AppActions.reinitialize,
        (_state, _action): DevelopmentState => this.createInitialState(),
      ),
      on(
        AppActions.initFromState,
        (_state, _action): DevelopmentState => this.createInitialState(),
      ),
      on(
        DevelopmentActions.hide,
        (state, _action): DevelopmentState => ({ ...state, isDev: false }),
      ),
      on(
        DevelopmentActions.setTestSudoku,
        (state, action): DevelopmentState => ({
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
