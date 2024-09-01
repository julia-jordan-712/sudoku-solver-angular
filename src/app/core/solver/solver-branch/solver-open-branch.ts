import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import {
  BranchingPoint,
  SolverBranch,
} from "@app/core/solver/types/solver-branch";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";

@Injectable()
export class SolverOpenBranch extends Solver {
  private static readonly STEP_ID: string = "BRANCH_OPEN";

  override getExecutionOrder(): number {
    return 6;
  }

  override reset(): void {
    // nothing to do
  }

  override executeSingleStep(lastResponse: SolverResponse): SolverStepResponse {
    if (lastResponse.status === "FAILED") {
      const currentBranch: Nullable<SolverBranch> =
        this.getCurrentBranch(lastResponse);
      if (currentBranch) {
        const branchingPointAndValue = this.findBranchingPointAndValue(
          currentBranch.grid,
        );
        if (branchingPointAndValue) {
          const newBranch: SolverBranch = currentBranch.openBranch(
            branchingPointAndValue.cell,
            branchingPointAndValue.value,
          );
          return {
            branches: [...lastResponse.branches, newBranch],
            failed: false,
            stepId: SolverOpenBranch.STEP_ID,
          };
        }
      }
    }
    return {
      branches: lastResponse.branches,
      failed: true,
      stepId: SolverOpenBranch.STEP_ID,
    };
  }

  private findBranchingPointAndValue(
    grid: SudokuGrid,
  ): Nullable<{ cell: BranchingPoint; value: number }> {
    for (
      let amountOfPossibleValues = 2;
      amountOfPossibleValues <= grid.length;
      amountOfPossibleValues++
    ) {
      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
          const cell: SudokuGridCell = grid[row][column];
          if (isArray(cell) && cell.length === amountOfPossibleValues) {
            return { cell: { row, column }, value: cell[0] };
          }
        }
      }
    }
    return null;
  }
}
