import { CySudokuCell } from "@cypress/selectors/cy-sudoku-cell";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";

export class CySudoku extends CySelectable {
  private readonly parentsSelector: CySelector[];

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-sudoku-grid", element);
    super(elementSelector, ...parents);
    this.parentsSelector = parents;
  }

  cell(row: number, column: number): CySudokuCell {
    return new CySudokuCell(
      { row, column },
      this.elementSelector,
      ...this.parentsSelector,
    );
  }
}
