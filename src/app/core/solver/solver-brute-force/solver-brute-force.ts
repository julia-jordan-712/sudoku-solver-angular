import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverResponse } from "@app/core/solver/solver-response";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverBruteForce extends Solver {
  constructor(private verify: VerifySolutionService) {
    super();
  }

  private failedAttempts = 0;

  override getExecutionOrder(): number {
    return 1000;
  }

  override reset(): void {
    this.failedAttempts = 0;
  }

  override executeNextStep(branches: SudokuGrid[]): SolverResponse {
    const isDone = this.execute(this.getCurrentBranch(branches));
    if (isDone) {
      return { branches, status: "COMPLETE" };
    } else if (this.failedAttempts >= 100) {
      return { branches, status: "FAILED" };
    } else {
      return { branches, status: "INCOMPLETE" };
    }
  }

  private execute(grid: Nullable<SudokuGrid>): boolean {
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
              this.failedAttempts++;
            } else {
              this.failedAttempts = 0;
            }
            break outerLoop;
          }
        }
      }
    }

    return isDone;
  }
}
