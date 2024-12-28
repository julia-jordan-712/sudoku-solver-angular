import { createActionGroup, emptyProps } from "@ngrx/store";

export const SudokuPuzzleSolverSwitchActions = createActionGroup({
  source: "SudokuPuzzleSolverSwitch",
  events: {
    "change puzzle": emptyProps(),
    "submit puzzle": emptyProps(),
  },
});
