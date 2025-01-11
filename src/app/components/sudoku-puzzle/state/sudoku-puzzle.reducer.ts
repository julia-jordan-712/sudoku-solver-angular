import { Injectable } from "@angular/core";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import {
  SudokuDropdownSelectionItem,
  SudokuPuzzleState,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { AppActions } from "@app/state/app-state";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { Puzzle9x9 } from "@test/puzzles/puzzle-9x9";

@Injectable({ providedIn: "root" })
export class SudokuPuzzleReducer {
  private createInitialState(): SudokuPuzzleState {
    const items: SudokuDropdownSelectionItem[] = [
      ...SudokuPuzzleSelectionTestData.createItems(),
    ];
    return {
      show: true,
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
        SudokuPuzzleSolverSwitchActions.changePuzzle,
        (state): SudokuPuzzleState => ({
          ...state,
          show: true,
        }),
      ),
      on(
        SudokuPuzzleSolverSwitchActions.submitPuzzle,
        (state): SudokuPuzzleState => ({
          ...state,
          show: false,
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
    );
  }
}
