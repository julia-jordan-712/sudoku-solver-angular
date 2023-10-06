import { Injectable } from "@angular/core";
import { Solver } from "@app/core/solver/solver";
import { ValuesPossibleOnce } from "@app/core/solver/solver-possible-once/values-possible-once";
import { SolverStepResponse } from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

@Injectable()
export class SolverPossibleOnce extends Solver {
  private valuesPossibleOnce: ValuesPossibleOnce = new ValuesPossibleOnce();

  override getExecutionOrder(): number {
    return 2;
  }

  override reset(): void {
    // nothing to do
  }

  override executeSingleStep(branches: SudokuGrid[]): SolverStepResponse {
    const changedSomething: boolean = this.execute(
      this.getCurrentBranch(branches),
    );
    return { branches, failed: !changedSomething };
  }

  private execute(grid: Nullable<SudokuGrid>): boolean {
    if (!isDefined(grid)) {
      return false;
    }

    if (this.valuesPossibleOnce.run(grid)) {
      return true;
    }

    return false;
  }
}
