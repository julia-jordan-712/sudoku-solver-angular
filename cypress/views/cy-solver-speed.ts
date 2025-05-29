import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySolverSpeed extends CySelectable {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    super(new CySelectorTag("app-sudoku-solver-speed", element), ...parents);
  }

  public readonly slower: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "slower",
      icon: "speed_slower",
    },
    this.elementSelector,
  );
  public readonly normal: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "normal",
      icon: "speed_normal",
    },
    this.elementSelector,
  );
  public readonly faster: CyButtonWithIcon = new CyButtonWithIcon(
    {
      id: "faster",
      icon: "speed_faster",
    },
    this.elementSelector,
  );
}
