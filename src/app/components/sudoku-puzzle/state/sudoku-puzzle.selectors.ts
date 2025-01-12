import {
  SudokuPuzzleState,
  SudokuPuzzleStateKey,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { SudokuSize } from "@app/types/sudoku-size";
import { SudokuGridViewModelConverter } from "@app/util/sudoku-grid-view-model-converter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState =
  createFeatureSelector<SudokuPuzzleState>(SudokuPuzzleStateKey);

const selectIsShown = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.show,
);

const selectHeight = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.height,
);

const selectWidth = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.width,
);

const selectSize = createSelector(
  selectState,
  (state: SudokuPuzzleState) =>
    ({ width: state.width, height: state.height }) satisfies SudokuSize,
);

const selectSelectionOptions = createSelector(
  selectState,
  (state: SudokuPuzzleState) => state.selectionOptions.options,
);

const selectSelectedOption = createSelector(
  selectState,
  (state: SudokuPuzzleState) => {
    const selectedId = state.selectionOptions.selectedId;
    return selectedId
      ? state.selectionOptions.options.find(
          (option) => option.id === selectedId,
        )
      : null;
  },
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
            branchInfo: {
              id: "Sudoku-Puzzle-Branch",
              isCurrent: true,
            },
            verificationResult: new VerifySolution().verify(sudoku, {
              allowEmptyCells: true,
              trackUniquenessViolations: true,
            }),
            highlightChangedCells: false,
          },
        )
      : null,
);

const selectIsConfirmEnabled = createSelector(
  selectViewModel,
  (viewModel: Nullable<SudokuGridViewModel>) =>
    viewModel?.data?.verificationResult?.isValid() ?? false,
);

export const SudokuPuzzleSelectors = {
  selectState,
  selectHeight,
  selectIsShown,
  selectIsConfirmEnabled,
  selectSelectedOption,
  selectSelectionOptions,
  selectSize,
  selectSudoku,
  selectViewModel,
  selectWidth,
};
