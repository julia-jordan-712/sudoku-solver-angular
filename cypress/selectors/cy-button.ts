import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyButton extends CySelectable<HTMLButtonElement> {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    super(new CySelectorTag("button", element), ...parents);
  }
}
