import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuPuzzleReducer } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.reducer";
import { SudokuPuzzleState } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { SudokuSolverReducer } from "@app/components/sudoku-solver/state/sudoku-solver.reducer";
import { SudokuSolverState } from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { AppState } from "@app/state/app-state";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

export class TestState {
  public static createEmptyAppState(): AppState {
    return {
      [SudokuPuzzleReducer.featureKey]: this.createEmptySudokuPuzzleState(),
      [SudokuSolverReducer.featureKey]: this.createEmptySudokuSolverState(),
    };
  }

  public static createTestAppState(): AppState {
    return {
      [SudokuPuzzleReducer.featureKey]: this.createTestSudokuPuzzleState(),
      [SudokuSolverReducer.featureKey]: this.createTestSudokuSolverState(),
    };
  }

  public static createEmptySudokuPuzzleState(): SudokuPuzzleState {
    return {
      isConfirmed: false,
      sudoku: undefined,
      height: undefined,
      width: undefined,
      selectionOptions: { options: [], selected: undefined },
    };
  }

  public static createEmptySudokuSolverState(): SudokuSolverState {
    return {
      executionInfo: {
        amountOfBranches: 1,
        id: "",
        status: "NOT_STARTED",
        stepsExecuted: 0,
        time: { started: null, stopped: null, lastStep: null },
      },
      settings: {
        delay: 0,
        highlightNumber: undefined,
        maxSteps: 1000,
        pauseAfterStep: undefined,
      },
      puzzle: undefined,
      response: {
        branches: [],
        status: "UNKNOWN",
        stepId: "",
      },
    };
  }

  public static createTestSudokuPuzzleState(
    grid: SudokuGrid = PuzzleSimple.PUZZLE_5.puzzle,
  ): SudokuPuzzleState {
    return {
      isConfirmed: true,
      sudoku: grid,
      height: grid.length,
      width: grid.length,
      selectionOptions: {
        options: SudokuPuzzleSelectionTestData.ITEMS,
        selected: SudokuPuzzleSelectionTestData.ITEMS?.[6],
      },
    };
  }

  public static createTestSudokuSolverState(
    grid: SudokuGrid = PuzzleSimple.PUZZLE_5.puzzle,
  ): SudokuSolverState {
    return {
      executionInfo: {
        amountOfBranches: 1,
        id: "test-execution-id",
        status: "PAUSED",
        stepsExecuted: 1,
        time: { started: Date.now(), stopped: null, lastStep: null },
      },
      settings: {
        ...this.createEmptySudokuSolverState().settings,
      },
      puzzle: grid,
      response: {
        branches: [SolverBranch.createInitialBranch(grid)],
        status: "INCOMPLETE",
        stepId: "test-step-id",
      },
    };
  }
}
