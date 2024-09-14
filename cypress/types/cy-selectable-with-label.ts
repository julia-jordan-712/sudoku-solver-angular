import { CyIcon } from "@cypress/selectors/cy-icon";
import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelector } from "@cypress/types/cy-selector";

export class CySelectableWithLabel extends CySelectable {
  public readonly label: CySelectable<HTMLLabelElement>;
  public readonly icon: CyIcon;

  constructor(element: CySelector, ...parents: CySelector[]) {
    super(element, ...parents);
    this.label = new CySelectable<HTMLLabelElement>(
      { tag: "label" },
      element,
      ...parents,
    );
    this.icon = new CyIcon(element, ...parents);
  }
}
