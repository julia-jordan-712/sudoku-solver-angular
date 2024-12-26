import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelectableWithLabel } from "@cypress/types/cy-selectable-with-label";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyDropdown extends CySelectableWithLabel {
  public readonly dropdown: CySelect;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-dropdown-input", element);
    super(elementSelector, ...parents);
    this.dropdown = new CySelect(elementSelector, ...parents);
  }
}

class CySelect extends CySelectable {
  constructor(...parents: CySelector[]) {
    super({ tag: "select" }, ...parents);
  }

  expectSelected(text: string): void {
    this.get().should("contain.text", text);
  }

  /** Selects the "no selection" item */
  unselect(): void {
    this.select(0);
  }

  select(indexOrText: number | string): void {
    this.get().select(indexOrText);
  }
}
