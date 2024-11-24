import {
  SudokuSolverActions,
  SudokuSolverActionStepResult,
} from "@app/components/sudoku-solver/state/sudoku-solver.actions";
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
import { AppActions } from "@app/state/app-state";
import { createReducer, on } from "@ngrx/store";
import { v4 as randomUUID } from "uuid";

export class SudokuSolverReducer {
  public readonly initialState: SudokuSolverState = {
    executionInfo: {
      id: randomUUID(),
      amountOfBranches: 1,
      stepsExecuted: 0,
      status: "NOT_STARTED",
      time: { started: null, stopped: null, lastStep: null },
    },
    puzzle: undefined,
    response: this.createInitialSolverResponse(),
    settings: {
      delay: 0,
      highlightNumber: null,
      maxSteps: 1_000,
      pauseAfterStep: null,
    },
    previousCurrentGrid: undefined,
  };

  public readonly reducer = createReducer(
    this.initialState,
    on(
      AppActions.init,
      (_state, action): SudokuSolverState => ({
        ...action.state.sudokuSolver,
        response: {
          ...action.state.sudokuSolver.response,
          branches: action.state.sudokuSolver.response.branches.map((branch) =>
            SolverBranch.cloneBranch(branch),
          ),
        },
      }),
    ),
    on(
      SudokuSolverActions.setInitialPuzzle,
      (state, action): SudokuSolverState =>
        this.resetWithPuzzleAndResponse(
          state,
          action.puzzle,
          this.createInitialSolverResponse(action.puzzle),
        ),
    ),
    on(
      SudokuSolverActions.setDelay,
      (state, action): SudokuSolverState =>
        this.toNewSettings(state, { delay: action.delay }),
    ),
    on(
      SudokuSolverActions.setMaximumSteps,
      (state, action): SudokuSolverState =>
        this.toNewSettings(state, {
          maxSteps: Math.max(0, action.maxSteps),
        }),
    ),
    on(
      SudokuSolverActions.setNumberToBeHighlighted,
      (state, action): SudokuSolverState =>
        this.toNewSettings(state, {
          highlightNumber: action.highlight,
        }),
    ),
    on(
      SudokuSolverActions.setStepToBePausedAfter,
      (state, action): SudokuSolverState =>
        this.toNewSettings(state, {
          pauseAfterStep:
            action.pauseStep != null ? Math.max(0, action.pauseStep) : null,
        }),
    ),
    on(
      SudokuSolverActions.solverReset,
      SudokuSolverActions.solverCancel,
      (state): SudokuSolverState =>
        this.resetWithPuzzleAndResponse(
          state,
          this.initialState.puzzle,
          this.initialState.response,
        ),
    ),
    on(
      SudokuSolverActions.solverRestart,
      (state): SudokuSolverState =>
        this.resetWithPuzzleAndResponse(
          state,
          state.puzzle,
          this.createInitialSolverResponse(state.puzzle ?? undefined),
        ),
    ),
    on(
      SudokuSolverActions.solverStart,
      (state): SudokuSolverState =>
        this.toNewExecutionInfo(state, {
          status: "RUNNING",
        }),
    ),
    on(
      SudokuSolverActions.solverPause,
      (state): SudokuSolverState =>
        this.toNewExecutionInfo(state, {
          status: "PAUSED",
        }),
    ),
    on(
      SudokuSolverActions.stepExecute,
      (state): SudokuSolverState =>
        this.toNewExecutionInfo(state, {
          time: {
            ...state.executionInfo.time,
            started: state.executionInfo.time.started ?? Date.now(),
          },
        }),
    ),
    on(
      SudokuSolverActions.stepResult,
      (state, action): SudokuSolverState => this.toNewStepResult(state, action),
    ),
  );

  private createInitialSolverResponse(puzzle?: SudokuGrid): SolverResponse {
    return {
      branches: puzzle ? [SolverBranch.createInitialBranch(puzzle)] : [],
      status: "UNKNOWN",
      stepId: "",
    };
  }

  private resetWithPuzzleAndResponse(
    state: SudokuSolverState,
    puzzle: Nullable<SudokuGrid>,
    response: SolverResponse,
  ): SudokuSolverState {
    return {
      executionInfo: {
        ...this.initialState.executionInfo,
        id: randomUUID(),
      },
      puzzle: puzzle ? SudokuGridUtil.clone(puzzle) : undefined,
      response: response,
      settings: { ...state.settings },
      previousCurrentGrid: this.initialState.previousCurrentGrid,
    };
  }

  private toNewExecutionInfo(
    state: SudokuSolverState,
    fromAction: Partial<SudokuSolverStateExecutionInfo>,
  ): SudokuSolverState {
    return {
      ...state,
      executionInfo: { ...state.executionInfo, ...fromAction },
    };
  }

  private toNewSettings(
    state: SudokuSolverState,
    fromAction: Partial<SudokuSolverStateSettings>,
  ): SudokuSolverState {
    return { ...state, settings: { ...state.settings, ...fromAction } };
  }

  private toNewStepResult(
    state: SudokuSolverState,
    action: SudokuSolverActionStepResult,
  ): SudokuSolverState {
    const previous: Nullable<SudokuGrid> = state.response.branches.filter(
      (branch) => branch.isCurrentBranch(),
    )?.[0]?.grid;
    return {
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
      previousCurrentGrid: previous ? SudokuGridUtil.clone(previous) : null,
    };
  }
}
