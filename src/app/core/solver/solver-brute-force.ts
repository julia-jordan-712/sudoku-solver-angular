import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";

export class SolverBruteForce {
  constructor(
    private verify: VerifySolutionService,
    private solverState: SudokuSolverStateService,
  ) {}

  execute(grid: Nullable<SudokuGrid>): void {
    let isDone = true;

    if (grid) {
      outerLoop: for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          const cell = grid[i][j];
          if (isNotArray(cell) && !isDefined(cell)) {
            isDone = false;

            grid[i][j] = Math.ceil(Math.random() * grid.length);
            if (!this.verify.verify(grid).isValid()) {
              grid[i][j] = undefined;
            }
            break outerLoop;
          }
        }
      }
    }

    if (isDone) {
      this.solverState.finishExecuting("DONE");
    }
  }
}
