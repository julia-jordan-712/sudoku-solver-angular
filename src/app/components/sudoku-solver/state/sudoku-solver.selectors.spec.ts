import { SudokuSolverSelectors } from "@app/components/sudoku-solver/state/sudoku-solver.selectors";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridViewModel,
  SudokuGridViewModelBranchInfo,
} from "@app/shared/types/sudoku-grid-view-model";
import { AppState } from "@app/state";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { TestState } from "@app/test/state/test-state";

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
      const testState = createTestStateWithCurrentBranchGrid(
        Puzzle4x4.COMPLETE,
      );

      const result: SudokuGridViewModel | null =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState);

      expect(result).not.toBeNull();
      expect(result?.data.verificationResult).toBeTruthy();
      expect(result?.data.verificationResult?.isValid()).toBeTrue();
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

      const result: SudokuGridViewModel[] =
        SudokuSolverSelectors.selectAdditionalBranchViewModels(testState);

      expect(result.length).toEqual(1);
      expect(result?.[0]?.data.verificationResult).toBeNull();
    });
  });

  describe("current branch view model", () => {
    it("should create single view model with exactly the same cell values", async () => {
      const testState = createTestStateWithCurrentBranchGrid([
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

    it("should have correct max value in each cell", async () => {
      const testState = createTestStateWithCurrentBranchGrid(Puzzle4x4.EMPTY);

      const viewModel: SudokuGridViewModel =
        SudokuSolverSelectors.selectCurrentBranchViewModel(testState)!;

      viewModel.rows
        .flatMap((row) => row.cells.map((cell) => cell.data.maxValue))
        .forEach((maxValue) => expect(maxValue).toEqual(4));
    });
  });

  describe("additional branches view models", () => {
    it("should not include current branch in additional branches", async () => {
      // arrange
      const initialBranch: SolverBranch = SolverBranch.createInitialBranch(
        Puzzle4x4.INCOMPLETE_ALL_VALUES,
      );
      const secondBranch: SolverBranch = initialBranch.openBranch(
        { row: 0, column: 0 },
        1,
      );
      const currentBranch: SolverBranch = secondBranch.openBranch(
        { row: 1, column: 1 },
        2,
      );
      const branches: SolverBranch[] = [
        initialBranch,
        currentBranch,
        secondBranch,
      ];
      const testState = TestState.createTestAppState();
      testState.sudokuSolver.response.branches = branches;

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

    it("should order multiple view models by branches", async () => {
      // arrange
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
      const branches: SolverBranch[] = [
        thirdBranch,
        fourthBranch,
        initialBranch,
        currentBranch,
        secondBranch,
      ];
      const testState = TestState.createTestAppState();
      testState.sudokuSolver.response.branches = branches;

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
  });

  function createTestStateWithCurrentBranchGrid(grid: SudokuGrid): AppState {
    const testState = TestState.createTestAppState();
    testState.sudokuSolver.response.branches = [
      SolverBranch.createInitialBranch(grid),
    ];
    return testState;
  }

  function removeExecutionIdFromViewModelId(
    viewModel: SudokuGridViewModel,
  ): string {
    return viewModel.id.substring(viewModel.id.indexOf("_") + 1);
  }
});
