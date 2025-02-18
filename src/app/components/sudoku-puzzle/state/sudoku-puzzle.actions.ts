import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuSize } from "@app/types/sudoku-size";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const SudokuPuzzleActions = createActionGroup({
  source: "SudokuPuzzle",
  events: {
    "clear selected option": emptyProps(),
    "set size": props<{ height?: number; width?: number }>(),
    "set sudoku": props<{ sudoku: Nullable<SudokuGrid> }>(),
    "user change size": props<SudokuSize>(),
    "user set selected option": props<{
      option: Nullable<SudokuDropdownSelectionItem>;
    }>(),
  },
});
