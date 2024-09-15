import { CySudoku } from "@cypress/selectors/cy-sudoku";
import { CySelectable } from "@cypress/types/cy-selectable";
import { CySolverActions } from "@cypress/views/cy-solver-actions";
import { CySolverStatus } from "@cypress/views/cy-solver-status";

export class CySolver extends CySelectable {
  constructor() {
    super({ tag: "app-sudoku-solver" });
  }

  public readonly actions: CySolverActions = new CySolverActions();
  public readonly branches: CySelectable = new CySelectable(
    { tag: "app-sudoku-solver-branches" },
    this.elementSelector,
  );
  public readonly status: CySolverStatus = new CySolverStatus(
    {},
    this.elementSelector,
  );
  public readonly steps: CySelectable = new CySelectable(
    { tag: "app-sudoku-solver-steps" },
    this.elementSelector,
  );
  public readonly sudoku: CySudoku = new CySudoku(
    { dataCy: "current-branch" },
    this.elementSelector,
  );

  additionalBranch(index = 0): CySudoku {
    return new CySudoku(
      { dataCy: `additional-branch-${index}` },
      this.elementSelector,
    );
  }
}
