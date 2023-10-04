import { Solver } from "@app/core/solver/solver";
import { EmptyCellsToPossibleNumbers } from "@app/core/solver/solver-eliminate/empty-cells-to-possible-numbers";
import { SolverResponse } from "@app/core/solver/solver-response";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";

export class SolverEliminate extends Solver {
  private allCellsContainValuesOrPossibleValues = false;

  override reset(): void {
    this.allCellsContainValuesOrPossibleValues = false;
  }

  override executeNextStep(branches: SudokuGrid[]): SolverResponse {
    const changedSomething: boolean = this.execute(
      this.getCurrentBranch(branches),
    );

    const status = !changedSomething
      ? this.isDone(this.getCurrentBranch(branches))
        ? "COMPLETE"
        : "FAILED"
      : "INCOMPLETE";
    return { branches, status };
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

    return changedSomething;
  }
}
