import { Injectable } from "@angular/core";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import {
  SudokuDropdownSelectionItem,
  SudokuPuzzleState,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppActions } from "@app/state/app-state";
import { Puzzle9x9 } from "@app/test/puzzles/puzzle-9x9";
import { ActionReducer, createReducer, on } from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class SudokuPuzzleReducer {
  private createInitialState(): SudokuPuzzleState {
    const items: SudokuDropdownSelectionItem[] = [
      ...SudokuPuzzleSelectionTestData.createItems(),
    ];
    return {
      isConfirmed: false,
      sudoku: Puzzle9x9.EMPTY,
      height: 9,
      width: 9,
      selectionOptions: {
        options: items,
        selectedId: undefined,
      },
    };
  }

  getReducer(): ActionReducer<SudokuPuzzleState> {
    return createReducer(
      this.createInitialState(),
      on(
        AppActions.reinitialize,
        (_state, _action): SudokuPuzzleState => this.createInitialState(),
      ),
      on(
        AppActions.initFromState,
        (_state, action): SudokuPuzzleState => ({
          ...action.state.sudokuPuzzle,
        }),
      ),
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
          selectionOptions: { ...state.selectionOptions, selectedId: null },
        }),
      ),
      on(
        SudokuPuzzleActions.userSetSelectedOption,
        (state, action): SudokuPuzzleState => ({
          ...state,
          selectionOptions: {
            ...state.selectionOptions,
            selectedId: action.option?.id,
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
}
