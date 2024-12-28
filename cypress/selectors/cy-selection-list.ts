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

  index(index = 0): CySelectionListElement {
    return new CySelectionListElementIndex(this.elementSelector, index);
  }

  text(text: string): CySelectionListElement {
    return new CySelectionListElementText(this.elementSelector, text);
  }
}

abstract class CySelectionListElement extends CyButton {
  expect(selected: "selected" | "not.selected"): void {
    this.get().should(
      selected === "selected" ? "have.class" : "not.have.class",
      "selected",
    );
  }
}

class CySelectionListElementText extends CySelectionListElement {
  constructor(
    parent: CySelector,
    private text: string,
  ) {
    super({}, parent);
  }

  override get(): CyHtmlChain<HTMLButtonElement> {
    return super.get().contains(this.text);
  }
}
class CySelectionListElementIndex extends CySelectionListElement {
  constructor(
    parent: CySelector,
    private index: number,
  ) {
    super({}, parent);
  }

  override get(): CyHtmlChain<HTMLButtonElement> {
    return super.get().eq(this.index);
  }
}
