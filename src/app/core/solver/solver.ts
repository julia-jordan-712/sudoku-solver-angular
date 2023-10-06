import { SolverResponse } from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";

export abstract class Solver {
  abstract getExecutionOrder(): number;

  abstract executeNextStep(branches: SudokuGrid[]): SolverResponse;

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
