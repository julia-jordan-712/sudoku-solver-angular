import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySolverActions extends CySelectable {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    super(new CySelectorTag("app-sudoku-solver-actions", element), ...parents);
  }

  public readonly next: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "next",
      icon: "skip_next",
    },
    this.elementSelector,
  );
  public readonly pause: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "pause",
      icon: "pause",
    },
    this.elementSelector,
  );
  public readonly restart: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "restart",
      icon: "restart_alt",
    },
    this.elementSelector,
  );
  public readonly start: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "start",
      icon: "play_arrow",
    },
    this.elementSelector,
  );
}
