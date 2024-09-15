import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelectableWithLabel } from "@cypress/types/cy-selectable-with-label";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyDropdown extends CySelectableWithLabel {
  public readonly dropdown: CySelectable<HTMLSelectElement>;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-dropdown", element);
    super(elementSelector, ...parents);
    this.dropdown = new CySelectable<HTMLSelectElement>(
      { tag: "select" },
      elementSelector,
      ...parents,
    );
  }
}
