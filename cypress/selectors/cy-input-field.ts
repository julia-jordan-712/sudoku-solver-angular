import { CyHtmlChain } from "@cypress/types/cy-html-chain";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyInputField extends CySelectable<HTMLInputElement> {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    super(new CySelectorTag("input", element), ...parents);
  }

  clear(): CyHtmlChain<HTMLInputElement> {
    return this.get().clear();
  }

  setValue(value: number): CyHtmlChain<HTMLInputElement> {
    return this.get().type("{selectall}").type(value.toString());
  }
}
