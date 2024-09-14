import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import {
  SudokuSolverState,
  SudokuSolverStateExecutionInfo,
  SudokuSolverStateSettings,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { createFeature, createReducer, on } from "@ngrx/store";
import { v4 as randomUUID } from "uuid";

export class SudokuSolverReducer {
  public static readonly featureKey = "sudokuSolver";

  public static readonly initialState: SudokuSolverState = {
    executionInfo: {
      id: randomUUID(),
      amountOfBranches: 1,
      stepsExecuted: 0,
      status: "NOT_STARTED",
      time: { started: null, stopped: null, lastStep: null },
    },
    puzzle: undefined,
    response: SudokuSolverReducer.createInitialSolverResponse(),
    settings: {
      delay: 0,
      highlightNumber: null,
      maxSteps: 1_000,
      pauseAfterStep: null,
    },
  };

  public static readonly reducer = createReducer(
    SudokuSolverReducer.initialState,
    on(SudokuSolverActions.setInitialPuzzle, (state, action) =>
      SudokuSolverReducer.resetWithPuzzleAndResponse(
        state,
        action.puzzle,
        SudokuSolverReducer.createInitialSolverResponse(action.puzzle),
      ),
    ),
    on(SudokuSolverActions.setDelay, (state, action) =>
      SudokuSolverReducer.toNewSettings(state, { delay: action.delay }),
    ),
    on(SudokuSolverActions.setMaximumSteps, (state, action) =>
      SudokuSolverReducer.toNewSettings(state, {
        maxSteps: Math.max(0, action.maxSteps),
      }),
    ),
    on(SudokuSolverActions.setNumberToBeHighlighted, (state, action) =>
      SudokuSolverReducer.toNewSettings(state, {
        highlightNumber: action.highlight,
      }),
    ),
    on(SudokuSolverActions.setStepToBePausedAfter, (state, action) =>
      SudokuSolverReducer.toNewSettings(state, {
        pauseAfterStep:
          action.pauseStep != null ? Math.max(0, action.pauseStep) : null,
      }),
    ),
    on(
      SudokuSolverActions.solverReset,
      SudokuSolverActions.solverCancel,
      (state, _action) =>
        SudokuSolverReducer.resetWithPuzzleAndResponse(
          state,
          SudokuSolverReducer.initialState.puzzle,
          SudokuSolverReducer.initialState.response,
        ),
    ),
    on(SudokuSolverActions.solverRestart, (state, _action) =>
      SudokuSolverReducer.resetWithPuzzleAndResponse(
        state,
        state.puzzle,
        SudokuSolverReducer.createInitialSolverResponse(
          state.puzzle ?? undefined,
        ),
      ),
    ),
    on(SudokuSolverActions.solverStart, (state, _action) =>
      SudokuSolverReducer.toNewExecutionInfo(state, {
        status: "RUNNING",
      }),
    ),
    on(SudokuSolverActions.solverPause, (state, _action) =>
      SudokuSolverReducer.toNewExecutionInfo(state, {
        status: "PAUSED",
      }),
    ),
    on(SudokuSolverActions.stepExecute, (state, _action) =>
      SudokuSolverReducer.toNewExecutionInfo(state, {
        time: {
          ...state.executionInfo.time,
          started: state.executionInfo.time.started ?? Date.now(),
        },
      }),
    ),
    on(SudokuSolverActions.stepResult, (state, action) => ({
      ...state,
      executionInfo: {
        id: state.executionInfo.id,
        status: action.status,
        stepsExecuted: state.executionInfo.stepsExecuted + 1,
        amountOfBranches:
          state.executionInfo.amountOfBranches +
          action.numberOfNewBranchesCreated,
        time: {
          started: state.executionInfo.time.started,
          stopped:
            action.status === "DONE" || action.status === "FAILED"
              ? Date.now()
              : null,
          lastStep: Date.now(),
        },
      },
      response: action.response,
    })),
  );

  private static createInitialSolverResponse(
    puzzle?: SudokuGrid,
  ): SolverResponse {
    return {
      branches: puzzle ? [SolverBranch.createInitialBranch(puzzle)] : [],
      status: "UNKNOWN",
      stepId: "",
    };
  }

  private static resetWithPuzzleAndResponse(
    state: SudokuSolverState,
    puzzle: Nullable<SudokuGrid>,
    response: SolverResponse,
  ): SudokuSolverState {
    return {
      executionInfo: {
        ...SudokuSolverReducer.initialState.executionInfo,
        id: randomUUID(),
      },
      puzzle: puzzle ? SudokuGridUtil.clone(puzzle) : undefined,
      response: response,
      settings: { ...state.settings },
    };
  }

  private static toNewExecutionInfo(
    state: SudokuSolverState,
    fromAction: Partial<SudokuSolverStateExecutionInfo>,
  ): SudokuSolverState {
    return {
      ...state,
      executionInfo: { ...state.executionInfo, ...fromAction },
    };
  }

  private static toNewSettings(
    state: SudokuSolverState,
    fromAction: Partial<SudokuSolverStateSettings>,
  ): SudokuSolverState {
    return { ...state, settings: { ...state.settings, ...fromAction } };
  }
}

export const sudokuSolverFeature = createFeature({
  name: SudokuSolverReducer.featureKey,
  reducer: SudokuSolverReducer.reducer,
});
