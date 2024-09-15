import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelectableWithLabel } from "@cypress/types/cy-selectable-with-label";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyNumberInput extends CySelectableWithLabel {
  public readonly input: CySelectable<HTMLInputElement>;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-number-input", element);
    super(elementSelector, ...parents);
    this.input = new CySelectable<HTMLInputElement>(
      { tag: "input" },
      elementSelector,
      ...parents,
    );
  }
}
