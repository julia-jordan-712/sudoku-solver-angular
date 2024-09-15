import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";
import { CyNumberInput } from "@cypress/selectors/cy-number-input";

export class CySolverSettings {
  private readonly hostSelector = "app-sudoku-solver-settings";

  public readonly delay: CyNumberInput = new CyNumberInput(
    { dataCy: "delay" },
    { tag: this.hostSelector },
  );
  public readonly maxSteps: CyNumberInput = new CyNumberInput(
    { dataCy: "maxSteps" },
    { tag: this.hostSelector },
  );
  public readonly pauseAtStep: CyNumberInput = new CyNumberInput(
    { dataCy: "pauseAtStep" },
    { tag: this.hostSelector },
  );
  public readonly highlightNumber: CyNumberInput = new CyNumberInput(
    { dataCy: "highlightValue" },
    { tag: this.hostSelector },
  );
  public readonly copySudoku: CyButtonWithIcon = new CyButtonWithIcon(
    { dataCy: "copySudoku", icon: "content_copy" },
    { tag: this.hostSelector },
  );
}
