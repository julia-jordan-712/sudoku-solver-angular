import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { EliminateFromRowOrColumn } from "@app/core/solver/solver-eliminate/eliminate-from-row-column";
import { EliminateFromSquare } from "@app/core/solver/solver-eliminate/eliminate-from-square";
import { EliminateOtherValuesFromPossibleMultiples } from "@app/core/solver/solver-eliminate/eliminate-other-values-from-possible-multiples";
import { EliminatePossibleMultiplesFromOtherCells } from "@app/core/solver/solver-eliminate/eliminate-possible-multiples-from-other-cells";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { isDefined } from "@app/util/is-defined";

@Injectable()
export class SolverEliminate extends Solver {
  override getExecutionOrder(): number {
    return 5;
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
      return { stepId: "ELIMINATE", failed: true };
    }

    if (new EliminatePossibleMultiplesFromOtherCells().run(grid)) {
      return {
        stepId: "ELIMINATE_POSSIBLE_MULTIPLES_FROM_OTHER_CELLS",
        failed: false,
      };
    }
    if (new EliminateFromSquare().run(grid)) {
      return { stepId: "ELIMINATE_FROM_SQUARE", failed: false };
    }
    if (new EliminateFromRowOrColumn().run(grid)) {
      return { stepId: "ELIMINATE_FROM_ROW_OR_COLUMN", failed: false };
    }
    if (new EliminateOtherValuesFromPossibleMultiples().run(grid)) {
      return {
        stepId: "ELIMINATE_OTHER_VALUES_FROM_POSSIBLE_MULTIPLES",
        failed: false,
      };
    }

    return { stepId: "ELIMINATE", failed: true };
  }
}
