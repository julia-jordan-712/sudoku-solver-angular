import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { EliminateFromRowOrColumn } from "@app/core/solver/solver-eliminate/eliminate-from-row-column";
import { EliminateFromSquare } from "@app/core/solver/solver-eliminate/eliminate-from-square";
import { EliminateOtherCellsFromPossiblePair } from "@app/core/solver/solver-eliminate/eliminate-other-cells-from-possible-pair";
import { EliminatePossiblePairFromOtherCells } from "@app/core/solver/solver-eliminate/eliminate-possible-pair-from-other-cells";
import { SolverStepResponse } from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverEliminate extends Solver {
  override getExecutionOrder(): number {
    return 4;
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
      return { stepId: "ELIMINATE", failed: true };
    }

    if (new EliminatePossiblePairFromOtherCells().run(grid)) {
      return {
        stepId: "ELIMINATE_POSSIBLE_PAIR_FROM_OTHER_CELLS",
        failed: false,
      };
    }
    if (new EliminateOtherCellsFromPossiblePair().run(grid)) {
      return {
        stepId: "ELIMINATE_OTHER_CELLS_FROM_POSSIBLE_PAIR",
        failed: false,
      };
    }
    if (new EliminateFromSquare().run(grid)) {
      return { stepId: "ELIMINATE_FROM_SQUARE", failed: false };
    }
    if (new EliminateFromRowOrColumn().run(grid)) {
      return { stepId: "ELIMINATE_FROM_ROW_OR_COLUMN", failed: false };
    }

    return { stepId: "ELIMINATE", failed: true };
  }
}
