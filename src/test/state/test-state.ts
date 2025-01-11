import {
  DevFunctionsState,
  DevFunctionsStateKey,
} from "@app/components/dev-functions/state/dev-functions.state";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import {
  SudokuDropdownSelectionItem,
  SudokuPuzzleState,
  SudokuPuzzleStateKey,
} from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import {
  SudokuSolverState,
  SudokuSolverStateKey,
} from "@app/components/sudoku-solver/state/sudoku-solver.state";
import { SolverBranch } from "@app/core/solver/types/solver-branch";
import { AppState } from "@app/state/app-state";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";
import { PuzzleSimple } from "src/test/puzzles/puzzle-simple";

export class TestState {
  public static createEmptyAppState(): AppState {
    return {
      [DevFunctionsStateKey]: this.createDevFunctionsState(),
      [SudokuPuzzleStateKey]: this.createEmptySudokuPuzzleState(),
      [SudokuSolverStateKey]: this.createEmptySudokuSolverState(),
    };
  }

  public static createTestAppState(
    currentGrid?: SudokuGrid,
    previousGrid?: SudokuGrid,
  ): AppState {
    return {
      [DevFunctionsStateKey]: this.createDevFunctionsState(),
      [SudokuPuzzleStateKey]: this.createTestSudokuPuzzleState(),
      [SudokuSolverStateKey]: this.createTestSudokuSolverState(
        currentGrid,
        previousGrid,
      ),
    };
  }

  private static createDevFunctionsState(): DevFunctionsState {
    return { isDev: true };
  }

  public static createEmptySudokuPuzzleState(): SudokuPuzzleState {
    return {
      show: true,
      sudoku: undefined,
      height: undefined,
      width: undefined,
      selectionOptions: { options: [], selectedId: undefined },
    };
  }

  public static createEmptySudokuSolverState(): SudokuSolverState {
    return {
      show: false,
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
    const items: SudokuDropdownSelectionItem[] = [
      ...SudokuPuzzleSelectionTestData.createItems(),
    ];
    return {
      show: false,
      sudoku: grid,
      height: grid.length,
      width: grid.length,
      selectionOptions: {
        options: items,
        selectedId: items[6].id,
      },
    };
  }

  public static createTestSudokuSolverState(
    currentGrid: SudokuGrid = PuzzleSimple.PUZZLE_5.puzzle,
    previousGrid: SudokuGrid = PuzzleSimple.PUZZLE_5.puzzle,
  ): SudokuSolverState {
    return {
      show: true,
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
