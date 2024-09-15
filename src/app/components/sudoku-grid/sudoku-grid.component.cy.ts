import { Component, Input } from "@angular/core";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { VerifySolution } from "@app/core/verification/services/verify-solution";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { VerifyI18nKey } from "@app/core/verification/types/verify-i18n-keys";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { CySudoku } from "@cypress/selectors/cy-sudoku";
import { CyComponentInput } from "@cypress/types/cy-component-input";
import { v4 as randomUUID } from "uuid";
import { SudokuGridComponent } from "./sudoku-grid.component";

describe(SudokuGridComponent.name, () => {
  const underTest: CySudoku = new CySudoku();

  function setup(
    input: Omit<CyComponentInput<SudokuGridComponent>, "grid"> & {
      grid: SudokuGrid;
      verification?: VerificationResult;
    },
  ) {
    return cy.mount(SudokuGridWrapperComponent, SudokuGridModule, {
      ...input,
      grid: SudokuGridViewModelConverter.createViewModelFromGrid(
        SudokuGridUtil.clone(input.grid),
        randomUUID(),
        { id: "test-id", isCurrent: true },
        input.verification,
      ),
    });
  }

  it("should display the values from the grid", () => {
    const testGrid: SudokuGrid = [
      [1, 2, 3, [4]],
      [3, undefined, 1, 2],
      [[2], [1, 3], [4], [1, 4]],
      [4, [1], 2, 3],
    ];
    setup({ grid: testGrid });

    // first row
    underTest.cell(0, 0).possibleValues.get().should("not.exist");
    underTest.cell(0, 0).value.get().should("have.value", "1");
    underTest.cell(0, 1).possibleValues.get().should("not.exist");
    underTest.cell(0, 1).value.get().should("have.value", "2");
    underTest.cell(0, 2).possibleValues.get().should("not.exist");
    underTest.cell(0, 2).value.get().should("have.value", "3");
    underTest.cell(0, 3).possibleValues.get().should("have.text", "4");
    underTest.cell(0, 3).value.get().should("not.exist");

    // second row
    underTest.cell(1, 0).possibleValues.get().should("not.exist");
    underTest.cell(1, 0).value.get().should("have.value", "3");
    underTest.cell(1, 1).possibleValues.get().should("not.exist");
    underTest.cell(1, 1).value.get().should("have.value", "");
    underTest.cell(1, 2).possibleValues.get().should("not.exist");
    underTest.cell(1, 2).value.get().should("have.value", "1");
    underTest.cell(1, 3).possibleValues.get().should("not.exist");
    underTest.cell(1, 3).value.get().should("have.value", "2");

    // third row
    underTest.cell(2, 0).possibleValues.get().should("have.text", "2");
    underTest.cell(2, 0).value.get().should("not.exist");
    underTest.cell(2, 1).possibleValues.get().should("have.text", "13");
    underTest.cell(2, 1).value.get().should("not.exist");
    underTest.cell(2, 2).possibleValues.get().should("have.text", "4");
    underTest.cell(2, 2).value.get().should("not.exist");
    underTest.cell(2, 3).possibleValues.get().should("have.text", "14");
    underTest.cell(2, 3).value.get().should("not.exist");

    // last row
    underTest.cell(3, 0).possibleValues.get().should("not.exist");
    underTest.cell(3, 0).value.get().should("have.value", "4");
    underTest.cell(3, 1).possibleValues.get().should("have.text", "1");
    underTest.cell(3, 1).value.get().should("not.exist");
    underTest.cell(3, 2).possibleValues.get().should("not.exist");
    underTest.cell(3, 2).value.get().should("have.value", "2");
    underTest.cell(3, 3).possibleValues.get().should("not.exist");
    underTest.cell(3, 3).value.get().should("have.value", "3");
  });

  describe("verification", () => {
    it("should display the verification from the view model", () => {
      setup({
        grid: Puzzle4x4.INCOMPLETE_INVALID_ROW,
        verification: VerificationResult.createFromErrors([
          VerifyI18nKey.ERROR_DUPLICATE_ELEMENTS,
        ]),
      });

      underTest.verification.shouldBeInvalid("The Sudoku contains duplicates");
    });

    it("should display whether a cell is a duplicate", () => {
      /**
       * Contains duplications of value 3 in
       * - first column
       * - lower left square
       * - last row
       */
      const duplicateElements: SudokuGrid = [
        [undefined, undefined, 3, undefined],
        [3, undefined, undefined, undefined],
        [undefined, 3, undefined, undefined],
        [3, undefined, undefined, 3],
      ];
      setup({
        grid: duplicateElements,
        verification: new VerifySolution().verify(duplicateElements, {
          allowEmptyCells: true,
          trackUniquenessViolations: true,
        }),
      });

      underTest.verification.shouldBeInvalid("The Sudoku contains duplicates");

      underTest.cell(0, 2).shouldBeDuplicate(false);
      underTest.cell(1, 0).shouldBeDuplicate();
      underTest.cell(2, 1).shouldBeDuplicate();
      underTest.cell(3, 0).shouldBeDuplicate();
      underTest.cell(3, 3).shouldBeDuplicate();
    });
  });
});

@Component({
  selector: "test-wrapper",
  template: `<app-sudoku-grid
    [grid]="grid"
    [highlightNumber]="highlightNumber"
    [readonly]="readonly"
    (valueChange)="onValueChange($event)"
    (onValueSubmit)="onValueSubmit($event)"
  ></app-sudoku-grid>`,
})
class SudokuGridWrapperComponent {
  @Input({ required: true })
  grid: Nullable<SudokuGridViewModel>;
  @Input()
  highlightNumber: Nullable<number>;
  @Input()
  readonly: Nullable<boolean>;

  onValueChange(grid: SudokuGrid): void {}
  onValueSubmit(grid: SudokuGrid): void {}
}
