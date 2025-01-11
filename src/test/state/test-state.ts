import {
  DevelopmentState,
  DevelopmentStateKey,
} from "@app/components/development-functions/state/development.state";
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
import { PuzzleSimple } from "@test/puzzles/puzzle-simple";

export class TestState {
  public static createEmptyAppState(): AppState {
    return {
      [DevelopmentStateKey]: this.createDevelopmentState(),
      [SudokuPuzzleStateKey]: this.createEmptySudokuPuzzleState(),
      [SudokuSolverStateKey]: this.createEmptySudokuSolverState(),
    };
  }

  public static createTestAppState(
    currentGrid?: SudokuGrid,
    previousGrid?: SudokuGrid,
  ): AppState {
    return {
      [DevelopmentStateKey]: this.createDevelopmentState(),
      [SudokuPuzzleStateKey]: this.createTestSudokuPuzzleState(),
      [SudokuSolverStateKey]: this.createTestSudokuSolverState(
        currentGrid,
        previousGrid,
      ),
    };
  }

  private static createDevelopmentState(): DevelopmentState {
    const selectionOptions = TestState.createTestSudokuDropdownSelectionItems();
    return {
      isDev: true,
      testSudokus: {
        options: selectionOptions.options,
        selectedId: selectionOptions.selectedId,
      },
    };
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
    const selectionOptions = TestState.createTestSudokuDropdownSelectionItems();
    return {
      show: false,
      sudoku: grid,
      height: grid.length,
      width: grid.length,
      selectionOptions: {
        options: selectionOptions.options,
        selectedId: selectionOptions.selectedId,
      },
    };
  }

  private static createTestSudokuDropdownSelectionItems(): {
    options: SudokuDropdownSelectionItem[];
    selectedId: string;
  } {
    const items: SudokuDropdownSelectionItem[] = [
      ...SudokuPuzzleSelectionTestData.createItems(),
    ];
    return { options: items, selectedId: items[6].id };
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
