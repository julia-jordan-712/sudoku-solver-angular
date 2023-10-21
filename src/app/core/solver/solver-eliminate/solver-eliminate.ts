import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { CleanupPossibleNumbers } from "@app/core/solver/solver-eliminate/cleanup-possible-numbers";
import { EmptyCellsToPossibleNumbers } from "@app/core/solver/solver-eliminate/empty-cells-to-possible-numbers";
import { SinglePossibleValue } from "@app/core/solver/solver-eliminate/single-possible-value";
import { SolverStepResponse } from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverEliminate extends Solver {
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
      return { stepId: "ELIMINATE", failed: true };
    }

    if (!this.allCellsContainValuesOrPossibleValues) {
      const foundNewPossibleValues: boolean =
        new EmptyCellsToPossibleNumbers().run(grid);
      this.allCellsContainValuesOrPossibleValues = !foundNewPossibleValues;
      if (foundNewPossibleValues) {
        return { stepId: "EMPTY_CELLS_TO_POSSIBLE_VALUES", failed: false };
      }
    }
    if (new SinglePossibleValue().run(grid)) {
      return { stepId: "SINGLE_POSSIBLE_VALUE", failed: false };
    }
    if (new CleanupPossibleNumbers().run(grid)) {
      return { stepId: "CLEANUP_POSSIBLE_VALUES", failed: false };
    }

    return { stepId: "ELIMINATE", failed: true };
  }
}
