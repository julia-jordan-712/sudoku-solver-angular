import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";
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
    this.verification = new CySudokuVerification(
      {},
      elementSelector,
      ...parents,
    );
  }

  cell(row: number, column: number): CySudokuCell {
    return new CySudokuCell(
      { row, column },
      this.elementSelector,
      ...this.parentsSelector,
    );
  }

  shouldEqual(sudoku: SudokuGrid) {
    for (let row = 0; row < sudoku.length; row++) {
      for (let column = 0; column < sudoku[row].length; column++) {
        const cyCell: CySudokuCell = this.cell(row, column);
        const cell: SudokuGridCell = sudoku[row][column];
        if (Array.isArray(cell)) {
          cyCell.possibleValues
            .get()
            .should("be.visible")
            .should("have.text", cell.join(""));
          cyCell.value.get().should("not.exist");
        } else if (isDefined(cell)) {
          cyCell.possibleValues.get().should("not.exist");
          cyCell.value
            .get()
            .should("be.visible")
            .should("have.value", cell.toString());
        } else {
          cyCell.possibleValues.get().should("not.exist");
          cyCell.value.get().should("be.visible").should("have.value", "");
        }
      }
    }
  }
}
