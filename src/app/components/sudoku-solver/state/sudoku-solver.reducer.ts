import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { createFeature, createReducer } from "@ngrx/store";
import { v4 as randomUUID } from "uuid";

export class SudokuSolverReducer {
  public static readonly featureKey = "sudokuSolver";

  public static readonly initialState: SudokuSolverState = {
    executionInfo: {
      id: randomUUID(),
      maxSteps: 10_000,
      stepsExecuted: 0,
      status: "NOT_STARTED",
      time: { started: null, stopped: null, lastStep: null },
    },
    puzzle: undefined,
    response: {
      branches: [],
      status: "UNKNOWN",
      stepId: "",
    },
    viewInfo: {
      amountOfBranches: 1,
      delay: 0,
      highlightNumber: null,
      pauseAfterStep: null,
    },
  };

  public static readonly reducer = createReducer(
    SudokuSolverReducer.initialState,
  );
}

export const sudokuSolverFeature = createFeature({
  name: SudokuSolverReducer.featureKey,
  reducer: SudokuSolverReducer.reducer,
});
