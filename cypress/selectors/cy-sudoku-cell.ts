import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelector } from "@cypress/types/cy-selector";

export class CySudokuCell {
  private readonly hostSelector = "app-sudoku-grid-cell";
  private readonly dataCy: string;

  public readonly possibleValues: CySelectable;
  public readonly value: CySelectable<HTMLInputElement>;

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
    this.value = new CySelectable<HTMLInputElement>(
      { tag: "input" },
      { dataCy: this.dataCy },
      { tag: this.hostSelector },
      ...parents,
    );
  }

  shouldBeDuplicate(duplicate = true): void {
    const selectable = new CySelectable({
      dataCy: this.dataCy,
      class: "duplicate",
    });
    if (duplicate) {
      selectable.get().should("be.visible");
    } else {
      selectable.get().should("not.exist");
    }
  }
}
