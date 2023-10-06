import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";

export abstract class Solver {
  abstract getExecutionOrder(): number;

  executeNextStep(branches: SudokuGrid[]): SolverResponse {
    if (this.isDone(this.getCurrentBranch(branches))) {
      return { branches, status: "COMPLETE" };
    }
    const response: SolverStepResponse = this.executeSingleStep(branches);
    return { branches, status: response.failed ? "FAILED" : "INCOMPLETE" };
  }

  protected abstract executeSingleStep(
    branches: SudokuGrid[],
  ): SolverStepResponse;

  abstract reset(): void;

  protected getCurrentBranch(branches: SudokuGrid[]): Nullable<SudokuGrid> {
    return branches?.slice(-1)?.[0];
  }

  protected isDone(grid: Nullable<SudokuGrid>): boolean {
    if (!isDefined(grid)) {
      return false;
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        const cell = grid[i][j];
        if (isArray(cell) || !isDefined(cell)) {
          return false;
        }
      }
    }
    return true;
  }
}
