import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";
import { createActionGroup, props } from "@ngrx/store";

export const DevelopmentActions = createActionGroup({
  source: "Development",
  events: {
    "show development functions": props<{ show: boolean }>(),
    "set test sudoku": props<{
      sudoku: Nullable<SudokuDropdownSelectionItem>;
    }>(),
  },
});
