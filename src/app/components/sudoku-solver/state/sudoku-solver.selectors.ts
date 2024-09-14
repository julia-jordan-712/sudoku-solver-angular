import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import {
  SudokuSolverState,
  SudokuSolverStateExecutionInfo,
  SudokuSolverStateSettings,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { Nullable } from "@app/shared/types/nullable";
import { SolverExecution } from "@app/shared/types/solver-execution";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState = createFeatureSelector<SudokuSolverState>(
  SudokuSolverReducer.featureKey,
);

const selectExecutionInfo = createSelector(
  selectState,
  (state: SudokuSolverState) => state.executionInfo,
);

const selectResponse = createSelector(
  selectState,
  (state: SudokuSolverState) => state.response,
);

const selectInitialPuzzle = createSelector(
  selectState,
  (state: SudokuSolverState) => state.puzzle,
);

const selectSettings = createSelector(
  selectState,
  (state: SudokuSolverState) => state.settings,
);

// ------------------------------------------------------------------

const selectAmountOfBranches = createSelector(
  selectExecutionInfo,
  (executionInfo: SudokuSolverStateExecutionInfo) =>
    executionInfo.amountOfBranches,
);

const selectAdditionalSortedResponseBranches = createSelector(
  selectResponse,
  (response: SolverResponse) =>
    response.branches
      .filter((branch) => !branch.isCurrentBranch())
      .sort((a, b) => b.compareTo(a)),
);

const selectCurrentResponseBranch = createSelector(
  selectResponse,
  (response: SolverResponse) =>
    response.branches.filter((branch) => branch.isCurrentBranch())?.[0],
);

const selectDelay = createSelector(
  selectSettings,
  (settings: SudokuSolverStateSettings) => settings.delay,
);

const selectExecutedSteps = createSelector(
  selectExecutionInfo,
  (executionInfo: SudokuSolverStateExecutionInfo) =>
    executionInfo.stepsExecuted,
);

const selectExecutionId = createSelector(
  selectExecutionInfo,
  (executionInfo: SudokuSolverStateExecutionInfo) => executionInfo.id,
);

const selectExecutionStatus = createSelector(
  selectExecutionInfo,
  (executionInfo: SudokuSolverStateExecutionInfo) => executionInfo.status,
);

const selectCanGoToNextStep = createSelector(
  selectExecutionStatus,
  (status: SolverExecution) => status === "PAUSED" || status === "NOT_STARTED",
);

const selectCanRestart = createSelector(
  selectExecutionStatus,
  (status: SolverExecution) => status === "DONE" || status === "FAILED",
);

const selectCanStart = createSelector(
  selectExecutionStatus,
  (status: SolverExecution) => status === "NOT_STARTED" || status === "PAUSED",
);

const selectCanPause = createSelector(
  selectExecutionStatus,
  (status: SolverExecution) => status === "RUNNING",
);

const selectHighlightNumber = createSelector(
  selectSettings,
  (settings: SudokuSolverStateSettings) => settings.highlightNumber,
);

const selectLastStepDescription = createSelector(
  selectResponse,
  (response: SolverResponse) => response.stepId,
);

const selectMaxSteps = createSelector(
  selectSettings,
  (settings: SudokuSolverStateSettings) => settings.delay,
);

const selectStepToBePausedAfter = createSelector(
  selectSettings,
  (settings: SudokuSolverStateSettings) => settings.pauseAfterStep,
);

const selectTimeInfo = createSelector(
  selectExecutionInfo,
  (executionInfo: SudokuSolverStateExecutionInfo) => executionInfo.time,
);

const selectTimeElapsed = createSelector(selectTimeInfo, (time) =>
  time.started == null
    ? null
    : time.stopped != null
      ? time.stopped - time.started
      : time.lastStep != null
        ? time.lastStep - time.started
        : null,
);

// ------------------------------------------------------------------

const selectCurrentBranchViewModel = createSelector(
  selectCurrentResponseBranch,
  selectExecutionId,
  selectExecutionStatus,
  (branch: Nullable<SolverBranch>, id: string, status: SolverExecution) =>
    branch != null
      ? SudokuGridViewModelConverter.createViewModelFromGrid(
          branch.grid,
          id,
          { id: branch.getId(), isCurrent: true },
          status !== "NOT_STARTED"
            ? new VerifySolution().verify(branch.grid, {
                allowEmptyCells: false,
                size: branch.grid.length,
              })
            : null,
        )
      : null,
);

const selectAdditionalBranchViewModels = createSelector(
  selectAdditionalSortedResponseBranches,
  selectExecutionId,
  (branches: SolverBranch[], id: string) =>
    branches.map((branch) =>
      SudokuGridViewModelConverter.createViewModelFromGrid(
        branch.grid,
        id,
        { id: branch.getId(), isCurrent: false },
        null,
      ),
    ),
);

export const SudokuSolverSelectors = {
  selectState,
  selectAdditionalBranchViewModels,
  selectAmountOfBranches,
  selectCurrentBranchViewModel,
  selectDelay,
  selectCanGoToNextStep,
  selectCanPause,
  selectCanRestart,
  selectCanStart,
  selectExecutedSteps,
  selectExecutionStatus,
  selectHighlightNumber,
  selectInitialPuzzle,
  selectLastStepDescription,
  selectMaxSteps,
  selectResponse,
  selectStepToBePausedAfter,
  selectTimeElapsed,
};
