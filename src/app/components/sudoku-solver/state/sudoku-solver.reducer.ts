import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { createFeature, createReducer } from "@ngrx/store";

export class SudokuSolverReducer {
  public static readonly featureKey = "sudokuSolver";

  public static readonly initialState: SudokuSolverState = {
    sudoku: undefined,
  };

  public static readonly reducer = createReducer(
    SudokuSolverReducer.initialState,
  );
}

export const sudokuSolverFeature = createFeature({
  name: SudokuSolverReducer.featureKey,
  reducer: SudokuSolverReducer.reducer,
});
