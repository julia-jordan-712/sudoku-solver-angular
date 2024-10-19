import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";

export interface AppState {
  [SudokuPuzzleReducer.featureKey]: SudokuPuzzleState;
  [SudokuSolverReducer.featureKey]: SudokuSolverState;
}

export const reducers: ActionReducerMap<AppState> = {
  [SudokuPuzzleReducer.featureKey]: SudokuPuzzleReducer.reducer,
  [SudokuSolverReducer.featureKey]: SudokuSolverReducer.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [];
