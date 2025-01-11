import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { AppState } from "@app/state/app-state";
import { Nullable } from "@app/types/nullable";
import { SolverExecution } from "@app/types/solver-execution";
import {
  SudokuGridCellViewModel,
  SudokuGridViewModel,
  SudokuGridViewModelBranchInfo,
} from "@app/types/sudoku-grid-view-model";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { TestState } from "@test/state/test-state";

describe("SudokuSolver Selectors", () => {
  it("should select the feature state", () => {
    const testState = TestState.createTestAppState();

    const result: SudokuSolverState =
      SudokuSolverSelectors.selectState(testState);

    expect(result).toEqual(testState.sudokuSolver);
  });

  describe("verification result", () => {
    it("should verify solution of the current branch", () => {
      // arrange
      const testState = TestState.createTestAppState(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );

      // act
      const result: SudokuGridViewModel | null =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeTrue();
    });

    it("should consider duplicates as invalid", () => {
      // arrange
      const testState = TestState.createTestAppState([
        [1, 2, 3, 4],
        [3, 1, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ]);

      // act
      const result: SudokuGridViewModel | null =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeFalse();
      expect(result?.data.verificationResult?.getErrors()).toContain({
        key: "VERIFY.ERROR.DUPLICATE_ELEMENTS",
      });
    });

    it("should trust size to be correct and not verify it all the time again and again", () => {
      // arrange
      const testState = TestState.createTestAppState([
        [1, 2, 3],
        [3, 4, 1],
        [2, 3, 4],
        [4, 1, 2],
      ]);

      // act
      const result: SudokuGridViewModel | null =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeTrue();
    });

    it("should consider cells with empty array as invalid", () => {
      // arrange
      const testState = TestState.createTestAppState([
        [1, 2, 3, 4],
        [3, [], 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ]);

      // act
      const result: SudokuGridViewModel | null =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeFalse();
      expect(result?.data.verificationResult?.getErrors()).toContain({
        key: "VERIFY.ERROR.EMPTY_CELL",
      });
    });

    it("should consider undefined cells as invalid", () => {
      // arrange
      const testState = TestState.createTestAppState(Puzzle4x4.EMPTY);

      // act
      const result: SudokuGridViewModel | null =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState);

      // assert
      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeFalse();
      expect(result?.data.verificationResult?.getErrors()).toContain({
        key: "VERIFY.ERROR.EMPTY_CELL",
      });
    });

    it("should NOT verify solution of the additional branches", () => {
      // arrange
      const testState = TestState.createTestAppState();
      const additionalBranch = SolverBranch.createInitialBranch([
        [[1, 2, 3, 4], 2, 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
      ]);
      const currentBranch = additionalBranch.openBranch(
        { row: 0, column: 0 },
        1,
      );
      testState.sudokuSolver.response.branches = [
        additionalBranch,
        currentBranch,
      ];

      // act
      const result: SudokuGridViewModel[] =
        SudokuSolverSelectors.selectAdditionalBranchViewModels(testState);

      // assert
      expect(result.length).toEqual(1);
      expect(result?.[0]?.data.verificationResult).toBeNull();
    });
  });

  describe("state transitions", () => {
    [
      {
        executionStatus: "NOT_STARTED" satisfies SolverExecution,
        can: { goToNextStep: true, restart: false, start: true, pause: false },
      },
      {
        executionStatus: "PAUSED" satisfies SolverExecution,
        can: { goToNextStep: true, restart: false, start: true, pause: false },
      },
      {
        executionStatus: "RUNNING" satisfies SolverExecution,
        can: { goToNextStep: false, restart: false, start: false, pause: true },
      },
      {
        executionStatus: "DONE" satisfies SolverExecution,
        can: { goToNextStep: false, restart: true, start: false, pause: false },
      },
      {
        executionStatus: "FAILED" satisfies SolverExecution,
        can: { goToNextStep: false, restart: true, start: false, pause: false },
      },
    ].forEach((params) => {
      const testState: AppState = TestState.createEmptyAppState();
      testState.sudokuSolver.executionInfo.status =
        params.executionStatus as SolverExecution;

      it(`should ${params.can.goToNextStep ? "" : "NOT"} be able to go to next step in status ${params.executionStatus}`, () => {
        expect(SudokuSolverSelectors.selectCanGoToNextStep(testState)).toEqual(
          params.can.goToNextStep,
        );
      });

      it(`should ${params.can.restart ? "" : "NOT"} be able to restart in status ${params.executionStatus}`, () => {
        expect(SudokuSolverSelectors.selectCanRestart(testState)).toEqual(
          params.can.restart,
        );
      });

      it(`should ${params.can.start ? "" : "NOT"} be able to start in status ${params.executionStatus}`, () => {
        expect(SudokuSolverSelectors.selectCanStart(testState)).toEqual(
          params.can.start,
        );
      });

      it(`should ${params.can.pause ? "" : "NOT"} be able to pause in status ${params.executionStatus}`, () => {
        expect(SudokuSolverSelectors.selectCanPause(testState)).toEqual(
          params.can.pause,
        );
      });
    });
  });

  describe("current branch view model", () => {
    it("should create single view model with exactly the same cell values", () => {
      const testState = TestState.createTestAppState([
        [1, 2, 3, 4],
        [3, 4, [1, 2], [1, 2]],
        [2, [1, 3], [1, 4], [1, 3]],
        [4, [1, 3], [1, 2], [1, 2, 3]],
      ]);

      const viewModel: SudokuGridViewModel =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState)!;

      expect(viewModel.rows.length).toEqual(4);
      const row0: SudokuGridCellViewModel[] = viewModel.rows[0].cells;
      expect(row0.length).toEqual(4);
      expect(row0[0].cell).toEqual(1);
      expect(row0[1].cell).toEqual(2);
      expect(row0[2].cell).toEqual(3);
      expect(row0[3].cell).toEqual(4);
      const row1: SudokuGridCellViewModel[] = viewModel.rows[1].cells;
      expect(row1.length).toEqual(4);
      expect(row1[0].cell).toEqual(3);
      expect(row1[1].cell).toEqual(4);
      expect(row1[2].cell).toEqual([1, 2]);
      expect(row1[3].cell).toEqual([1, 2]);
      const row2: SudokuGridCellViewModel[] = viewModel.rows[2].cells;
      expect(row2[0].cell).toEqual(2);
      expect(row2[1].cell).toEqual([1, 3]);
      expect(row2[2].cell).toEqual([1, 4]);
      expect(row2[3].cell).toEqual([1, 3]);
      const row3: SudokuGridCellViewModel[] = viewModel.rows[3].cells;
      expect(row3[0].cell).toEqual(4);
      expect(row3[1].cell).toEqual([1, 3]);
      expect(row3[2].cell).toEqual([1, 2]);
      expect(row3[3].cell).toEqual([1, 2, 3]);
    });

    it("should have correct max value in each cell", () => {
      const testState = TestState.createTestAppState(Puzzle4x4.EMPTY);

      const viewModel: Nullable<SudokuGridViewModel> =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState)!;

      viewModel?.rows
        .flatMap((row) => row.cells.map((cell) => cell.data.maxValue))
        .forEach((maxValue) => expect(maxValue).toEqual(4));
    });

    it("should highlight changed cells", () => {
      expect(
        SudokuSolverSelectors.selectCurrentBranchViewModel(
          TestState.createTestAppState(Puzzle4x4.EMPTY),
        )?.data.highlightChangedCells,
      ).toBeTrue();
    });

    it("should contain information about the previous grid", () => {
      const testState = TestState.createTestAppState(
        Puzzle4x4.EMPTY_COLUMN,
        Puzzle4x4.COMPLETE,
      );

      const viewModel: Nullable<SudokuGridViewModel> =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState)!;

      for (let row = 0; row < viewModel.rows.length; row++) {
        for (
          let column = 0;
          column < viewModel.rows[row].cells.length;
          column++
        ) {
          const result = viewModel.rows[row].cells[column];
          expect(result.previous).not.toBeUndefined();
          expect(result.previous).toEqual(Puzzle4x4.COMPLETE[row][column]);
        }
      }
    });
  });

  describe("additional branches view models", () => {
    const initialBranch: SolverBranch = SolverBranch.createInitialBranch(
      Puzzle4x4.INCOMPLETE_ALL_VALUES,
    );
    const secondBranch: SolverBranch = initialBranch.openBranch(
      { row: 0, column: 0 },
      1,
    );
    const thirdBranch: SolverBranch = secondBranch.openBranch(
      { row: 1, column: 1 },
      2,
    );
    const fourthBranch: SolverBranch = thirdBranch.openBranch(
      { row: 2, column: 3 },
      3,
    );
    const currentBranch: SolverBranch = fourthBranch.openBranch(
      { row: 3, column: 1 },
      4,
    );

    it("should not include current branch in additional branches", () => {
      // arrange
      const testState = TestState.createTestAppState();
      testState.sudokuSolver.response.branches = [
        initialBranch,
        currentBranch,
        secondBranch,
      ];

      // act
      const currentViewModel: SudokuGridViewModel =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState)!;
      const additionalViewModels: SudokuGridViewModel[] =
        SudokuSolverSelectors.selectAdditionalBranchViewModels(testState);

      // assert
      expect(additionalViewModels.length).toEqual(2);

      expect(removeExecutionIdFromViewModelId(currentViewModel)).toEqual(
        "CURRENT",
      );
      expect(removeExecutionIdFromViewModelId(currentViewModel)).not.toEqual(
        currentBranch.getId(),
      );
      const expectedCurrentBranchInfo: SudokuGridViewModelBranchInfo = {
        id: currentBranch.getId(),
        isCurrent: true,
      };
      expect(currentViewModel.data.branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );
      expect(currentViewModel.rows[0].data.branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );
      expect(currentViewModel.rows[0].cells[0].data.branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );

      expect(removeExecutionIdFromViewModelId(additionalViewModels[0])).toEqual(
        secondBranch.getId(),
      );
      expect(removeExecutionIdFromViewModelId(additionalViewModels[1])).toEqual(
        initialBranch.getId(),
      );
      const expectedInitialBranchInfo: SudokuGridViewModelBranchInfo = {
        id: initialBranch.getId(),
        isCurrent: false,
      };
      expect(additionalViewModels[1].data.branchInfo).toEqual(
        expectedInitialBranchInfo,
      );
      expect(additionalViewModels[1].rows[0].data.branchInfo).toEqual(
        expectedInitialBranchInfo,
      );
      expect(additionalViewModels[1].rows[0].cells[0].data.branchInfo).toEqual(
        expectedInitialBranchInfo,
      );
    });

    it("should order multiple view models by branches", () => {
      // arrange
      const testState = TestState.createTestAppState();
      testState.sudokuSolver.response.branches = [
        thirdBranch,
        fourthBranch,
        initialBranch,
        currentBranch,
        secondBranch,
      ];

      // act
      const viewModels: SudokuGridViewModel[] =
        SudokuSolverSelectors.selectAdditionalBranchViewModels(testState);

      // assert
      expect(viewModels.length).toEqual(4);

      expect(removeExecutionIdFromViewModelId(viewModels[0])).toEqual(
        fourthBranch.getId(),
      );
      const expectedCurrentBranchInfo: SudokuGridViewModelBranchInfo = {
        id: fourthBranch.getId(),
        isCurrent: false,
      };
      expect(viewModels[0].data.branchInfo).toEqual(expectedCurrentBranchInfo);
      expect(viewModels[0].rows[0].data.branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );
      expect(viewModels[0].rows[0].cells[0].data.branchInfo).toEqual(
        expectedCurrentBranchInfo,
      );

      expect(removeExecutionIdFromViewModelId(viewModels[1])).toEqual(
        thirdBranch.getId(),
      );
      expect(removeExecutionIdFromViewModelId(viewModels[2])).toEqual(
        secondBranch.getId(),
      );
      expect(removeExecutionIdFromViewModelId(viewModels[3])).toEqual(
        initialBranch.getId(),
      );
      const expectedInitialBranchInfo: SudokuGridViewModelBranchInfo = {
        id: initialBranch.getId(),
        isCurrent: false,
      };
      expect(viewModels[3].data.branchInfo).toEqual(expectedInitialBranchInfo);
      expect(viewModels[3].rows[0].data.branchInfo).toEqual(
        expectedInitialBranchInfo,
      );
      expect(viewModels[3].rows[0].cells[0].data.branchInfo).toEqual(
        expectedInitialBranchInfo,
      );
    });

    it("should NOT highlight changed cells", () => {
      const testState = TestState.createTestAppState();
      testState.sudokuSolver.response.branches = [
        thirdBranch,
        fourthBranch,
        initialBranch,
        currentBranch,
        secondBranch,
      ];

      const result: SudokuGridViewModel[] =
        SudokuSolverSelectors.selectAdditionalBranchViewModels(testState);

      result.forEach((viewModel) => {
        expect(viewModel.data.highlightChangedCells).toBeFalse();
      });
    });

    it("should NOT contain information about the previous grid", () => {
      const testState = TestState.createTestAppState();
      testState.sudokuSolver.response.branches = [
        thirdBranch,
        fourthBranch,
        initialBranch,
        currentBranch,
        secondBranch,
      ];

      const result: SudokuGridViewModel[] =
        SudokuSolverSelectors.selectAdditionalBranchViewModels(testState);

      result.forEach((viewModel) => {
        viewModel.rows.forEach((row) => {
          row.cells.forEach((cell) => {
            expect(cell.previous).toBeUndefined();
          });
        });
      });
    });
  });

  function removeExecutionIdFromViewModelId(
    viewModel: SudokuGridViewModel,
  ): string {
    return viewModel.id.substring(viewModel.id.indexOf("_") + 1);
  }
});
