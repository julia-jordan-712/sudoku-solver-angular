import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/types/nullable";
import { SolverExecution } from "@app/types/solver-execution";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export type SudokuSolverActionStepResultExecutionStatus = Extract<
  SolverExecution,
  "RUNNING" | "PAUSED" | "DONE" | "FAILED"
>;

export interface SudokuSolverActionStepResult {
  response: SolverResponse;
  status: SudokuSolverActionStepResultExecutionStatus;
  numberOfNewBranchesCreated: number;
}

export const SudokuSolverActions = createActionGroup({
  source: "SudokuSolver",
  events: {
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
    "speed faster": props<{ ms: number }>(),
    "speed normal": emptyProps(),
    "speed slower": props<{ ms: number }>(),
    "step execute": emptyProps(),
    "step do nothing": emptyProps(),
    "step result": props<SudokuSolverActionStepResult>(),
  },
});
