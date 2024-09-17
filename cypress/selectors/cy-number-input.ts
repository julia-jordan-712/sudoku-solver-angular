import { CyInputField } from "@cypress/selectors/cy-input-field";
import { CySelectableWithLabel } from "@cypress/types/cy-selectable-with-label";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyNumberInput extends CySelectableWithLabel {
  public readonly input: CyInputField;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-number-input", element);
    super(elementSelector, ...parents);
    this.input = new CyInputField({}, elementSelector, ...parents);
  }
}
