import { Injectable } from "@angular/core";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppActions } from "@app/state/app-state";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { SudokuPuzzleSelectionTestData } from "@test/puzzles/sudoku-puzzle-selection-test-data";
import { DevelopmentActions } from "./development.actions";
import { DevelopmentState } from "./development.state";

@Injectable({ providedIn: "root" })
export class DevelopmentReducer {
  private createInitialState(): DevelopmentState {
    const items: SudokuDropdownSelectionItem[] = [
      ...SudokuPuzzleSelectionTestData.createItems(),
    ];
    return {
      show: false,
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
        (_state, action): DevelopmentState => action.state.development,
      ),
      on(
        DevelopmentActions.showDevelopmentFunctions,
        (state, action): DevelopmentState => ({ ...state, show: action.show }),
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
