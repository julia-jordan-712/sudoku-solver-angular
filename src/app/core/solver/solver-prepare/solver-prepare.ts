import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { EmptyCellsToPossibleValues } from "@app/core/solver/solver-prepare/empty-cells-to-possible-values";
import {
  SolverResponse,
  SolverStepResponse,
} from "@app/core/solver/types/solver-response";
import { isDefined } from "@app/shared/util/is-defined";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";

@Injectable()
export class SolverPrepare extends Solver {
  private allCellsContainValuesOrPossibleValues = false;

  override getExecutionOrder(): number {
    return 1;
  }

  override reset(): void {
    this.allCellsContainValuesOrPossibleValues = false;
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
      return { stepId: "PREPARE", failed: true };
    }

    if (!this.allCellsContainValuesOrPossibleValues) {
      const foundNewPossibleValues: boolean = new EmptyCellsToPossibleValues(
        "ALL_CELLS",
      ).run(grid);
      this.allCellsContainValuesOrPossibleValues = !foundNewPossibleValues;
      if (foundNewPossibleValues) {
        return { stepId: "EMPTY_CELLS_TO_POSSIBLE_VALUES", failed: false };
      }
    }

    return { stepId: "PREPARE", failed: true };
  }
}
