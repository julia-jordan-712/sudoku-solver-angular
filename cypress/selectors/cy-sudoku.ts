import { CySudokuCell } from "@cypress/selectors/cy-sudoku-cell";
import { CySelectable } from "@cypress/types/cy-selectable";
import {
  CySelector,
  CySelectorTag,
  CySelectorWithoutTag,
} from "@cypress/types/cy-selector";
import { CySudokuVerification } from "@cypress/views/cy-sudoku-verification";

export class CySudoku extends CySelectable {
  private readonly parentsSelector: CySelector[];
  public readonly verification: CySudokuVerification;

  constructor(element?: CySelectorWithoutTag, ...parents: CySelector[]) {
    const elementSelector = new CySelectorTag("app-sudoku-grid", element);
    super(elementSelector, ...parents);
    this.parentsSelector = parents;
    this.verification = new CySudokuVerification(elementSelector, ...parents);
  }

  cell(row: number, column: number): CySudokuCell {
    return new CySudokuCell(
      { row, column },
      this.elementSelector,
      ...this.parentsSelector,
    );
  }
}
