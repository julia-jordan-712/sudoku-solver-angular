import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CyHintList extends CySelectable<HTMLElement> {
  public readonly hints: CySelectable<HTMLUListElement>;
  public readonly closeButton: CySelectable<HTMLElement>;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-hint-list", element);
    super(elementSelector, ...parents);
    this.hints = new CySelectable<HTMLUListElement>(
      { tag: "ul" },
      elementSelector,
      ...parents,
    );
    this.closeButton = new CySelectable<HTMLElement>(
      { tag: "app-close-button" },
      elementSelector,
      ...parents,
    );
  }
}
