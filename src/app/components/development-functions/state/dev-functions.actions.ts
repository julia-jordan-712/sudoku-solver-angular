import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const DevFunctionActions = createActionGroup({
  source: "DevFunctions",
  events: {
    hide: emptyProps(),
    "set test sudoku": props<{
      sudoku: Nullable<SudokuDropdownSelectionItem>;
    }>(),
  },
});
