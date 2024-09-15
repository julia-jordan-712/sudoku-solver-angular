import { CyButton } from "@cypress/selectors/cy-button";
import { CyIcon } from "@cypress/selectors/cy-icon";
import { CySelector, CySelectorWithoutTag } from "@cypress/types/cy-selector";

export class CyButtonWithIcon extends CyButton {
  public readonly icon: CyIcon;

  constructor(
    element: CySelectorWithoutTag & { icon: string },
    ...parents: CySelector[]
  ) {
    super(element, ...parents);
    this.icon = new CyIcon(element.icon, this.elementSelector, ...parents);
  }
}
