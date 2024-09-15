import { CySelectable } from "@cypress/types/cy-selectable";
import { CySelector } from "@cypress/types/cy-selector";

export class CySudokuCell {
  public readonly possibleValues: CySelectable;
  public readonly value: CySelectable<HTMLInputElement>;

  constructor(
    position: { row: number; column: number },
    ...parents: CySelector[]
  ) {
    const dataCy = `cell-${position.row}-${position.column}`;
    const tag = "app-sudoku-grid-cell";

    this.possibleValues = new CySelectable(
      { tag: "app-sudoku-grid-cell-multiple-values", dataCy },
      { tag },
      ...parents,
    );
    this.value = new CySelectable<HTMLInputElement>(
      { tag: "input" },
      { dataCy },
      { tag },
      ...parents,
    );
  }
}
