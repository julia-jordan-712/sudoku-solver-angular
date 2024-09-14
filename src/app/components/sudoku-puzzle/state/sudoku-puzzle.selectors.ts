import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState = createFeatureSelector<SudokuPuzzleState>(
  SudokuPuzzleReducer.featureKey,
);

const selectIsConfirmed = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.isConfirmed,
);

const selectHeight = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.height,
);

const selectWidth = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.width,
);

const selectSelectionOptions = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.selectionOptions.options,
);

const selectSelectedOption = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.selectionOptions.selected,
);

const selectSudoku = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.sudoku,
);

const selectViewModel = createSelector(
  selectSudoku,
  (sudoku: Nullable<SudokuGrid>) =>
    sudoku != null
      ? SudokuGridViewModelConverter.createViewModelFromGrid(
          sudoku,
          "Sudoku-Puzzle-View-Model-Id",
          {
            id: "Sudoku-Puzzle-Branch",
            isCurrent: true,
          },
          new VerifySolution().verify(sudoku, {
            allowEmptyCells: true,
            trackUniquenessViolations: true,
          }),
        )
      : null,
);

const selectIsConfirmEnabled = createSelector(
  selectViewModel,
  (viewModel: Nullable<SudokuGridViewModel>) =>
    viewModel?.verificationResult?.isValid() ?? false,
);

export const SudokuPuzzleSelectors = {
  selectState,
  selectHeight,
  selectIsConfirmed,
  selectIsConfirmEnabled,
  selectSelectedOption,
  selectSelectionOptions,
  selectSudoku,
  selectViewModel,
  selectWidth,
};
