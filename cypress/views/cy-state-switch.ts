import { CyButton } from "@cypress/selectors/cy-button";
import { CySelector } from "@cypress/types/cy-selector";

export class CyStateSwitch {
  private readonly selector: CySelector = {
    tag: "app-sudoku-puzzle-solver-switch",
  };

  public readonly buttonConfirm = new CyButton(
    { dataCy: "submit-puzzle" },
    this.selector,
  );
  public readonly buttonReopen = new CyButton(
    { dataCy: "change-puzzle" },
    this.selector,
  );
}
