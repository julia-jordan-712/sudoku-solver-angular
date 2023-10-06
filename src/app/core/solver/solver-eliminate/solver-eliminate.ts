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
    const changedSomething: boolean = this.execute(
      this.getCurrentBranch(branches),
    );
    return { branches, failed: !changedSomething };
  }

  private execute(grid: Nullable<SudokuGrid>): boolean {
    if (!isDefined(grid)) {
      return false;
    }
    let changedSomething = false;

    if (!this.allCellsContainValuesOrPossibleValues) {
      const foundNewPossibleValues: boolean =
        new EmptyCellsToPossibleNumbers().run(grid);
      this.allCellsContainValuesOrPossibleValues = !foundNewPossibleValues;
      changedSomething = foundNewPossibleValues;
    }
    if (!changedSomething) {
      changedSomething = new SinglePossibleValue().run(grid);
    }
    if (!changedSomething) {
      changedSomething = new CleanupPossibleNumbers().run(grid);
    }

    return changedSomething;
  }
}
