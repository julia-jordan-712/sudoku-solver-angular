import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { ConvertSinglePossibleValue } from "@app/core/solver/solver-search/convert-single-possible-value";
import { ConvertValuesPossibleOnce } from "@app/core/solver/solver-search/convert-values-possible-once";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverSearch extends Solver {
  private valuesPossibleOnce: ConvertValuesPossibleOnce =
    new ConvertValuesPossibleOnce();

  override getExecutionOrder(): number {
    return 4;
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
      return { stepId: "SEARCH", failed: true };
    }

    if (new ConvertSinglePossibleValue("ALL_CELLS").run(grid)) {
      return { stepId: "SINGLE_POSSIBLE_VALUE", failed: false };
    }
    if (this.valuesPossibleOnce.run(grid)) {
      return { stepId: "VALUES_POSSIBLE_ONCE", failed: false };
    }

    return { stepId: "SEARCH", failed: true };
  }
}
