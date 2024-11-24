import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import {
  SudokuPuzzleState,
  SudokuPuzzleStateKey,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import {
  SudokuSolverState,
  SudokuSolverStateKey,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { AppState } from "@app/state/app-state";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";

export class TestState {
  public static createEmptyAppState(): AppState {
    return {
      [SudokuPuzzleStateKey]: this.createEmptySudokuPuzzleState(),
      [SudokuSolverStateKey]: this.createEmptySudokuSolverState(),
    };
  }

  public static createTestAppState(
    currentGrid?: SudokuGrid,
    previousGrid?: SudokuGrid,
  ): AppState {
    return {
      [SudokuPuzzleStateKey]: this.createTestSudokuPuzzleState(),
      [SudokuSolverStateKey]: this.createTestSudokuSolverState(
        currentGrid,
        previousGrid,
      ),
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
      previousCurrentGrid: undefined,
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
    currentGrid: SudokuGrid = PuzzleSimple.PUZZLE_5.puzzle,
    previousGrid: SudokuGrid = PuzzleSimple.PUZZLE_5.puzzle,
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
      puzzle: currentGrid,
      response: {
        branches: [SolverBranch.createInitialBranch(currentGrid)],
        status: "INCOMPLETE",
        stepId: "test-step-id",
      },
      previousCurrentGrid: SudokuGridUtil.clone(previousGrid),
    };
  }
}
