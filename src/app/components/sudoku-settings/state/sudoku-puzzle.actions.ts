import { createActionGroup, emptyProps } from "@ngrx/store";

export const SudokuPuzzleActions = createActionGroup({
  source: "SudokuPuzzle",
  events: {
    "Load SudokuPuzzles": emptyProps(),
  },
});
