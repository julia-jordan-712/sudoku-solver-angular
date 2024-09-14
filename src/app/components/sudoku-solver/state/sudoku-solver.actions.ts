import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const SudokuSolverActions = createActionGroup({
  source: "SudokuSolver",
  events: {
    "set delay": props<{ delay: number }>(),
    "set initial puzzle": props<{ puzzle: SudokuGrid }>(),
    "set maximum steps": props<{ maxSteps: number }>(),
    "set number to be highlighted": props<{ highlight: number }>(),
    "set step to be paused after": props<{ pauseStep: number }>(),
    "solver finish": props<{
      status: Extract<SolverExecution, "DONE" | "FAILED">;
    }>(),
    "solver cancel": emptyProps(),
    "solver pause": emptyProps(),
    "solver reset": emptyProps(),
    "solver restart": emptyProps(),
    "solver start": emptyProps(),
  },
});
