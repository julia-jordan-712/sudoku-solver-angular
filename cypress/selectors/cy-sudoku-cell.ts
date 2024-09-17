import { CyInputField } from "@cypress/selectors/cy-input-field";
import { CyHtmlChain } from "@cypress/types/cy-html-chain";
import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelector, CySelectorTag } from "@cypress/types/cy-selector";

export class CySudokuCell extends CySelectable {
  public readonly possibleValues: CySelectable;
  public readonly value: CyInputField;

  constructor(
    position: { row: number; column: number },
    ...parents: CySelector[]
  ) {
    const dataCy = `cell-${position.row}-${position.column}`;
    super(
      new CySelectorTag("app-sudoku-grid-cell", { dataCy: dataCy }),
      ...parents,
    );

    this.possibleValues = new CySelectable(
      { tag: "app-sudoku-grid-cell-multiple-values" },
      this.elementSelector,
      ...parents,
    );
    this.value = new CyInputField(
      {},
      { tag: "app-sudoku-grid-cell-single-value" },
      this.elementSelector,
      ...parents,
    );
  }

  shouldBeChanged(changed = true): CyHtmlChain {
    return this.shouldHaveClass(changed, "changed");
  }

  shouldBeDuplicate(duplicate = true): CyHtmlChain {
    return this.shouldHaveClass(duplicate, "duplicate");
  }

  shouldBeFocused(focused = true): CyHtmlChain {
    return this.shouldHaveClass(focused, "focused");
  }

  shouldBeHighlighted(highlighted = true): CyHtmlChain {
    return this.shouldHaveClass(highlighted, "highlight");
  }

  shouldBeInvalid(invalid = true): CyHtmlChain {
    return this.shouldHaveClass(invalid, "invalid");
  }

  private shouldHaveClass(should: boolean, cssClass: string): CyHtmlChain {
    return this.get()
      .find("*")
      .should(should ? "have.class" : "not.have.class", cssClass);
  }
}
