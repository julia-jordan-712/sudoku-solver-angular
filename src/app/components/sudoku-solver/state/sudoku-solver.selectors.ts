import {
  SudokuSolverState,
  SudokuSolverStateExecutionInfo,
  SudokuSolverStateKey,
  SudokuSolverStateSettings,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SolverResponse } from "@app/core/solver/types/solver-response";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { I18nKey } from "@app/types/i18n-key";
import { Nullable } from "@app/types/nullable";
import { SolverExecution } from "@app/types/solver-execution";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModelConverter } from "@app/util/sudoku-grid-view-model-converter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState =
  createFeatureSelector<SudokuSolverState>(SudokuSolverStateKey);

const selectIsShown = createSelector(
  selectState,
  (state: SudokuSolverState) => state.show,
);

const selectExecutionInfo = createSelector(
  selectState,
  (state: SudokuSolverState) => state.executionInfo,
);

const selectResponse = createSelector(
  selectState,
  (state: SudokuSolverState) => state.response,
);

const selectPreviousGrid = createSelector(
  selectState,
  (state: SudokuSolverState) => state.previousCurrentGrid,
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

const selectIsPaused = createSelector(
  selectExecutionStatus,
  (status: SolverExecution) => status === "PAUSED",
);

const selectHighlightNumber = createSelector(
  selectSettings,
  (settings: SudokuSolverStateSettings) => settings.highlightNumber,
);

const selectLastStepI18nKey = createSelector(
  selectResponse,
  (response: SolverResponse) =>
    response.stepId
      ? ({ key: `SOLVER.STEPS.STEP.${response.stepId}` } satisfies I18nKey)
      : null,
);

const selectMaxSteps = createSelector(
  selectSettings,
  (settings: SudokuSolverStateSettings) => settings.maxSteps,
);

const selectSpeedIsNormal = createSelector(
  selectDelay,
  (delay: number) => delay === 600,
);

const selectSpeedCanIncrease = createSelector(
  selectDelay,
  (delay: number) => delay > 0,
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

const selectTimeElapsedMilliseconds = createSelector(
  selectTimeElapsed,
  (time) => time ?? 0,
);

const selectTimeElapsedSeconds = createSelector(
  selectTimeElapsedMilliseconds,
  (time) => time / 1000,
);

// ------------------------------------------------------------------

const selectCurrentBranchViewModel = createSelector(
  selectCurrentResponseBranch,
  selectExecutionId,
  selectExecutionStatus,
  selectPreviousGrid,
  (
    branch: Nullable<SolverBranch>,
    id: string,
    status: SolverExecution,
    previousGrid: Nullable<SudokuGrid>,
  ) =>
    branch != null
      ? SudokuGridViewModelConverter.createViewModelFromGrid(
          branch.grid,
          id,
          {
            branchInfo: { id: branch.getId(), isCurrent: true },
            verificationResult: new VerifySolution().verify(branch.grid, {
              allowEmptyCells: status === "NOT_STARTED",
              size: branch.grid.length,
            }),
            highlightChangedCells: true,
          },
          previousGrid ?? undefined,
        )
      : null,
);

const selectAdditionalBranchViewModels = createSelector(
  selectAdditionalSortedResponseBranches,
  selectExecutionId,
  (branches: SolverBranch[], id: string) =>
    branches.map((branch) =>
      SudokuGridViewModelConverter.createViewModelFromGrid(branch.grid, id, {
        branchInfo: { id: branch.getId(), isCurrent: false },
        verificationResult: null,
        highlightChangedCells: false,
      }),
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
  selectIsPaused,
  selectExecutedSteps,
  selectExecutionStatus,
  selectHighlightNumber,
  selectInitialPuzzle,
  selectIsShown,
  selectLastStepI18nKey,
  selectMaxSteps,
  selectResponse,
  selectStepToBePausedAfter,
  selectSpeedIsNormal,
  selectSpeedCanIncrease,
  selectTimeElapsedMilliseconds,
  selectTimeElapsedSeconds,
};
