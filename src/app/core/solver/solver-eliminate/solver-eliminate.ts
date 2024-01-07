import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { EliminatePossiblePair } from "@app/core/solver/solver-eliminate/eliminate-possible-pair";
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

    if (new EliminatePossiblePair().run(grid)) {
      return { stepId: "ELIMINATE_POSSIBLE_PAIR", failed: false };
    }

    return { stepId: "ELIMINATE", failed: true };
  }
}
