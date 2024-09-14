import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const SudokuPuzzleActions = createActionGroup({
  source: "SudokuPuzzle",
  events: {
    "clear selected option": emptyProps(),
    "set confirmed": props<{ confirmed: boolean }>(),
    "set height": props<{ height: number }>(),
    "set selected option": props<{ option: SudokuDropdownSelectionItem }>(),
    "set sudoku": props<{ sudoku: Nullable<SudokuGrid> }>(),
    "set width": props<{ width: number }>(),
  },
});
