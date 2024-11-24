import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import {
  SudokuPuzzleState,
  SudokuPuzzleStateKey,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import {
  SudokuSolverState,
  SudokuSolverStateKey,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import {
  ActionReducerMap,
  createActionGroup,
  MetaReducer,
  props,
} from "@ngrx/store";
import { environment } from "src/environments/environment";

export const AppActions = createActionGroup({
  source: "Sudoku",
  events: {
    init: props<{ state: AppState }>(),
  },
});

export interface AppState {
  [SudokuPuzzleStateKey]: SudokuPuzzleState;
  [SudokuSolverStateKey]: SudokuSolverState;
}

export const reducers: ActionReducerMap<AppState> = {
  [SudokuPuzzleStateKey]: new SudokuPuzzleReducer().reducer,
  [SudokuSolverStateKey]: new SudokuSolverReducer().reducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [];
