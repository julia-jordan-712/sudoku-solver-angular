import { CyIcon } from "@cypress/selectors/cy-icon";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySudokuVerification extends CySelectable {
  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag(
      "app-sudoku-verification",
      element,
    );
    super(elementSelector, ...parents);
  }

  shouldBeValid(): void {
    this.get().should("have.class", "valid");
    CyIcon.find(this.get(), "check_circle").should("be.visible");
  }

  shouldBeInvalid(...messages: string[]): void {
    this.get().should("not.have.class", "valid");
    CyIcon.find(this.get(), "error").should("be.visible");
    messages.forEach((message: string) => {
      this.get().should("contain.text", message);
    });
  }
}
