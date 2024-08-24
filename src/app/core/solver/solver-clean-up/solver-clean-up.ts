import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { CleanupPossibleValues } from "@app/core/solver/solver-clean-up/cleanup-possible-values";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverCleanUp extends Solver {
  override getExecutionOrder(): number {
    return 2;
  }

  override reset(): void {
    // nothing to do
  }

  override executeSingleStep(lastResponse: SolverResponse): SolverStepResponse {
    const currentBranch: Nullable<SudokuGrid> = this.cloneCurrentBranch(
      lastResponse.branches,
    );
    const response: Omit<SolverStepResponse, "branches"> =
      this.execute(currentBranch);
    return {
      ...response,
      branches: this.replaceCurrentBranch(lastResponse.branches, currentBranch),
    };
  }

  private execute(
    grid: Nullable<SudokuGrid>,
  ): Omit<SolverStepResponse, "branches"> {
    if (!isDefined(grid)) {
      return { stepId: "CLEAN_UP", failed: true };
    }

    if (new CleanupPossibleValues().run(grid)) {
      return { stepId: "CLEANUP_POSSIBLE_VALUES", failed: false };
    }

    return { stepId: "CLEAN_UP", failed: true };
  }
}
