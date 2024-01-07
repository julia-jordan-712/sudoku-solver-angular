import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { EmptyCellsToPossibleValues } from "@app/core/solver/solver-prepare/empty-cells-to-possible-values";
import { SolverStepResponse } from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverPrepare extends Solver {
  private allCellsContainValuesOrPossibleValues = false;

  override getExecutionOrder(): number {
    return 1;
  }

  override reset(): void {
    this.allCellsContainValuesOrPossibleValues = false;
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
      return { stepId: "PREPARE", failed: true };
    }

    if (!this.allCellsContainValuesOrPossibleValues) {
      const foundNewPossibleValues: boolean =
        new EmptyCellsToPossibleValues().run(grid);
      this.allCellsContainValuesOrPossibleValues = !foundNewPossibleValues;
      if (foundNewPossibleValues) {
        return { stepId: "EMPTY_CELLS_TO_POSSIBLE_VALUES", failed: false };
      }
    }

    return { stepId: "PREPARE", failed: true };
  }
}
