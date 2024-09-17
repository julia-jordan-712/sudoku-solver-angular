import { CyInputField } from "@cypress/selectors/cy-input-field";
import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelector } from "@cypress/types/cy-selector";

export class CySudokuCell {
  private readonly hostSelector = "app-sudoku-grid-cell";
  private readonly dataCy: string;

  public readonly possibleValues: CySelectable;
  public readonly value: CyInputField;

  constructor(
    position: { row: number; column: number },
    ...parents: CySelector[]
  ) {
    this.dataCy = `cell-${position.row}-${position.column}`;

    this.possibleValues = new CySelectable(
      { tag: "app-sudoku-grid-cell-multiple-values", dataCy: this.dataCy },
      { tag: this.hostSelector },
      ...parents,
    );
    this.value = new CyInputField(
      {},
      { dataCy: this.dataCy },
      { tag: this.hostSelector },
      ...parents,
    );
  }
  shouldBeChanged(changed = true): void {
    this.shouldHaveClass(changed, "changed");
  }

  shouldBeDuplicate(duplicate = true): void {
    this.shouldHaveClass(duplicate, "duplicate");
  }

  shouldBeFocused(focused = true): void {
    this.shouldHaveClass(focused, "focused");
  }

  shouldBeHighlighted(highlighted = true): void {
    this.shouldHaveClass(highlighted, "highlight");
  }

  shouldBeInvalid(invalid = true): void {
    this.shouldHaveClass(invalid, "invalid");
  }

  private shouldHaveClass(should: boolean, cssClass: string): void {
    const selectable = new CySelectable({
      dataCy: this.dataCy,
      class: cssClass,
    });
    if (should) {
      selectable.get().should("be.visible");
    } else {
      selectable.get().should("not.exist");
    }
  }
}
