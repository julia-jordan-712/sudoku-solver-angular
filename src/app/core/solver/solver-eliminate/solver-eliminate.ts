import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { CleanupPossibleValues } from "@app/core/solver/solver-eliminate/cleanup-possible-values";
import { ConvertSinglePossibleValue } from "@app/core/solver/solver-eliminate/convert-single-possible-value";
import { EliminatePossiblePair } from "@app/core/solver/solver-eliminate/eliminate-possible-pair";
import { EmptyCellsToPossibleValues } from "@app/core/solver/solver-eliminate/empty-cells-to-possible-values";
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
        new EmptyCellsToPossibleValues().run(grid);
      this.allCellsContainValuesOrPossibleValues = !foundNewPossibleValues;
      if (foundNewPossibleValues) {
        return { stepId: "EMPTY_CELLS_TO_POSSIBLE_VALUES", failed: false };
      }
    }
    if (new ConvertSinglePossibleValue().run(grid)) {
      return { stepId: "SINGLE_POSSIBLE_VALUE", failed: false };
    }
    if (new CleanupPossibleValues().run(grid)) {
      return { stepId: "CLEANUP_POSSIBLE_VALUES", failed: false };
    }
    if (new EliminatePossiblePair().run(grid)) {
      return { stepId: "ELIMINATE_POSSIBLE_PAIR", failed: false };
    }

    return { stepId: "ELIMINATE", failed: true };
  }
}
