import { CyButton } from "@cypress/selectors/cy-button";
import { CyHtmlChain } from "@cypress/types/cy-html-chain";
import { CySelectableWithLabel } from "@cypress/types/cy-selectable-with-label";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySelectionList extends CySelectableWithLabel {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    super(new CySelectorTag("app-selection-list", element), ...parents);
  }

  button(index = 0): CyHtmlChain<HTMLButtonElement> {
    return new CyButton(this.elementSelector).get().eq(index);
  }
}
