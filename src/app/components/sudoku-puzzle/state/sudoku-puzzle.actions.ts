import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const SudokuPuzzleActions = createActionGroup({
  source: "SudokuPuzzle",
  events: {
    "change settings": emptyProps(),
    "clear selected option": emptyProps(),
    "set size": props<{ height?: number; width?: number }>(),
    "set sudoku": props<{ sudoku: Nullable<SudokuGrid> }>(),
    "submit settings": emptyProps(),
    "user change size": props<{ height: number; width: number }>(),
    "user set selected option": props<{
      option: SudokuDropdownSelectionItem;
    }>(),
  },
});
