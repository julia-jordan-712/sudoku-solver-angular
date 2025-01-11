import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { CleanupPossibleValues } from "@app/core/solver/solver-clean-up/cleanup-possible-values";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { isDefined } from "@app/shared/util/is-defined";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";

@Injectable()
export class SolverCleanUp extends Solver {
  override getExecutionOrder(): number {
    return 3;
  }

  override reset(): void {
    // nothing to do
  }

  override executeSingleStep(lastResponse: SolverResponse): SolverStepResponse {
    const response: Omit<SolverStepResponse, "branches"> = this.execute(
      this.getCurrentBranch(lastResponse)?.grid,
    );
    return {
      stepId: response.stepId,
      failed: response.failed,
      branches: lastResponse.branches,
    };
  }

  private execute(
    grid: Nullable<SudokuGrid>,
  ): Omit<SolverStepResponse, "branches"> {
    if (!isDefined(grid)) {
      return { stepId: "CLEAN_UP", failed: true };
    }

    if (new CleanupPossibleValues("ALL_CELLS").run(grid)) {
      return { stepId: "CLEANUP_POSSIBLE_VALUES", failed: false };
    }

    return { stepId: "CLEAN_UP", failed: true };
  }
}
