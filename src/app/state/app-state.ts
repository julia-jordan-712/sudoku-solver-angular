import { inject, InjectionToken } from "@angular/core";
import { DevelopmentReducer } from "@app/components/development-functions/state/development.reducer";
import {
  DevelopmentState,
  DevelopmentStateKey,
} from "@app/components/development-functions/state/development.state";
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
  Action,
  ActionReducerMap,
  createActionGroup,
  emptyProps,
  MetaReducer,
  props,
} from "@ngrx/store";
import { environment } from "src/environments/environment";

export const AppActions = createActionGroup({
  source: "Sudoku",
  events: {
    initFromState: props<{ state: AppState }>(),
    reinitialize: emptyProps(),
  },
});

export interface AppState {
  [DevelopmentStateKey]: DevelopmentState;
  [SudokuPuzzleStateKey]: SudokuPuzzleState;
  [SudokuSolverStateKey]: SudokuSolverState;
}

export const reducer: InjectionToken<
  ActionReducerMap<AppState, Action<string>>
> = new InjectionToken<ActionReducerMap<AppState>>("App State Reducers", {
  factory: () => ({
    [DevelopmentStateKey]: inject(DevelopmentReducer).getReducer(),
    [SudokuPuzzleStateKey]: inject(SudokuPuzzleReducer).getReducer(),
    [SudokuSolverStateKey]: inject(SudokuSolverReducer).getReducer(),
  }),
});

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : [];
