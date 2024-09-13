import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { createFeatureSelector } from "@ngrx/store";

export const selectState = createFeatureSelector<SudokuSolverState>(
  SudokuSolverReducer.featureKey,
);

export const SudokuSolverSelectors = {
  selectState,
};
