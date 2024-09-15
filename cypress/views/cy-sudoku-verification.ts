import { CyIcon } from "@cypress/selectors/cy-icon";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySudokuVerification extends CySelectable {
  private readonly valid: CySelectable;
  private readonly invalid: CySelectable;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag(
      "app-sudoku-verification",
      element,
    );
    super(elementSelector, ...parents);
    this.valid = new CySelectable(
      { class: "valid" },
      elementSelector,
      ...parents,
    );
    this.invalid = new CySelectable(
      { class: "invalid" },
      elementSelector,
      ...parents,
    );
  }

  shouldBeValid(): void {
    this.valid.get().should("be.visible");
    CyIcon.find(this.valid.get(), "check_circle").should("be.visible");

    this.invalid.get().should("not.exist");
  }

  shouldBeInvalid(...messages: string[]): void {
    this.invalid.get().should("be.visible");
    CyIcon.find(this.invalid.get(), "report").should("be.visible");
    messages.forEach((message: string) => {
      this.invalid.get().should("contain.text", message);
    });

    this.valid.get().should("not.exist");
  }
}
