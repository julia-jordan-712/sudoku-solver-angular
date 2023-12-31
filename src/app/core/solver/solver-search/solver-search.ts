import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { SolverStepResponse } from "@app/core/solver/solver-response";
import { ConvertSinglePossibleValue } from "@app/core/solver/solver-search/convert-single-possible-value";
import { ConvertValuesPossibleOnce } from "@app/core/solver/solver-search/convert-values-possible-once";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverSearch extends Solver {
  private valuesPossibleOnce: ConvertValuesPossibleOnce =
    new ConvertValuesPossibleOnce();

  override getExecutionOrder(): number {
    return 3;
  }

  override reset(): void {
    // nothing to do
  }

  override executeSingleStep(branches: SudokuGrid[]): SolverStepResponse {
    const response: Omit<SolverStepResponse, "branches"> = this.execute(
      this.getCurrentBranch(branches),
    );
    return { ...response, branches };
  }

  private execute(
    grid: Nullable<SudokuGrid>,
  ): Omit<SolverStepResponse, "branches"> {
    if (!isDefined(grid)) {
      return { stepId: "SEARCH", failed: true };
    }

    if (new ConvertSinglePossibleValue().run(grid)) {
      return { stepId: "SINGLE_POSSIBLE_VALUE", failed: false };
    }
    if (this.valuesPossibleOnce.run(grid)) {
      return { stepId: "VALUES_POSSIBLE_ONCE", failed: false };
    }

    return { stepId: "SEARCH", failed: true };
  }
}
