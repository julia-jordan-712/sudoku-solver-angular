import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const SudokuSolverActions = createActionGroup({
  source: "SudokuSolver",
  events: {
    "initialize from puzzle state": emptyProps(),
    "set delay": props<{ delay: number }>(),
    "set initial puzzle": props<{ puzzle: SudokuGrid }>(),
    "set maximum steps": props<{ maxSteps: number }>(),
    "set number to be highlighted": props<{ highlight: Nullable<number> }>(),
    "set step to be paused after": props<{ pauseStep: Nullable<number> }>(),
    "solver cancel": emptyProps(),
    "solver pause": emptyProps(),
    "solver reset": emptyProps(),
    "solver restart": emptyProps(),
    "solver start": emptyProps(),
    "step execute": emptyProps(),
    "step do nothing": emptyProps(),
    "step result": props<{
      response: SolverResponse;
      status: Extract<
        SolverExecution,
        "RUNNING" | "PAUSED" | "DONE" | "FAILED"
      >;
      numberOfNewBranchesCreated: number;
    }>(),
  },
});
