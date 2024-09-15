import {
  SOLVER_EXECUTION,
  SolverExecution,
} from "@app/shared/types/solver-execution";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySolverStatus extends CySelectable {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    super(new CySelectorTag("app-sudoku-solver-status", element), ...parents);
  }

  shouldBe(expectedStatus: SolverExecution): void {
    new CySelectable({ dataCy: expectedStatus }, this.elementSelector)
      .get()
      .should("be.visible");
    for (const status of SOLVER_EXECUTION) {
      if (status !== expectedStatus) {
        new CySelectable({ dataCy: status }, this.elementSelector)
          .get()
          .should("not.exist");
      }
    }
  }
}
