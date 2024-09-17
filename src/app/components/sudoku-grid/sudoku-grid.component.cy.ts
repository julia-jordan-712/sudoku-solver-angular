import { Component, Input } from "@angular/core";
import { SudokuGridComponent } from "@app/components/sudoku-grid/sudoku-grid.component";
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
import { CySudokuCell } from "@cypress/selectors/cy-sudoku-cell";
import { CyComponentInput } from "@cypress/types/cy-component-input";
import { v4 as randomUUID } from "uuid";

describe(SudokuGridComponent.name, () => {
  const underTest: CySudoku = new CySudoku();

  function setup(
    input: Omit<CyComponentInput<SudokuGridComponent>, "grid"> & {
      grid: SudokuGrid;
      verification?: VerificationResult;
      highlightChangedCells?: boolean;
    },
  ): void {
    cy.mount(SudokuGridWrapperComponent, SudokuGridModule, {
      ...input,
      grid: SudokuGridViewModelConverter.createViewModelFromGrid(
        SudokuGridUtil.clone(input.grid),
        randomUUID(),
        {
          branchInfo: { id: "test-id", isCurrent: false },
          verificationResult: input.verification,
          highlightChangedCells: input.highlightChangedCells ?? false,
        },
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

    underTest.shouldEqual(testGrid);
  });

  describe("enter values", () => {
    it("should be allowed normally", () => {
      setup({ grid: Puzzle4x4.EMPTY });
      const cell: CySudokuCell = underTest.cell(0, 0);

      cell.value.get().focus();
      cell.shouldBeFocused();
      cell.value.setValue(1);
      cell.shouldBeFocused();
      cell.value.get().blur().should("have.value", "1");
      cell.shouldBeFocused(false);
    });

    it("should not be allowed when readonly", () => {
      setup({ grid: Puzzle4x4.EMPTY, readonly: true });
      const cell: CySudokuCell = underTest.cell(0, 0);

      cell.value
        .get()
        .type("1")
        .should("have.value", "")
        .blur()
        .should("have.value", "");
    });
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

    it("should not allow to input zero, negative numbers or number larger than size", () => {
      setup({ grid: Puzzle4x4.EMPTY });
      const cell: CySudokuCell = underTest.cell(0, 0);

      // max allowed value
      cell.value.setValue(4);
      cell.shouldBeInvalid(false);
      cell.value.clear().blur();
      cell.shouldBeInvalid(false);

      // zero
      cell.value.setValue(0);
      cell.shouldBeInvalid();
      cell.value.clear().blur();
      cell.shouldBeInvalid(false);

      // negative number
      cell.value.setValue(-2);
      cell.shouldBeInvalid();
      cell.value.clear().blur();
      cell.shouldBeInvalid(false);

      // number which is too large
      cell.value
        .get()
        .should("be.enabled")
        .type("1")
        .should("have.value", "1")
        .type("4")
        .should("have.value", "14");
      cell.shouldBeInvalid();
      cell.value.clear().blur();
      cell.shouldBeInvalid(false);
    });
  });

  describe("highlighting", () => {
    it("should highlight the specified number both in values and possible values", () => {
      const testGrid: SudokuGrid = [
        [1, 2, 3, [4]],
        [3, undefined, 1, 2],
        [[2], [1, 3], [4], [1, 4]],
        [4, [1], 2, 3],
      ];
      setup({ grid: testGrid, highlightNumber: 3 });

      underTest.cell(0, 0).shouldBeHighlighted(false);
      underTest.cell(0, 1).shouldBeHighlighted(false);
      underTest.cell(0, 2).shouldBeHighlighted(true);
      underTest.cell(0, 3).shouldBeHighlighted(false);

      underTest.cell(1, 0).shouldBeHighlighted(true);
      underTest.cell(1, 1).shouldBeHighlighted(false);
      underTest.cell(1, 2).shouldBeHighlighted(false);
      underTest.cell(1, 3).shouldBeHighlighted(false);

      underTest.cell(2, 0).shouldBeHighlighted(false);
      underTest.cell(2, 1).shouldBeHighlighted(true);
      underTest.cell(2, 2).shouldBeHighlighted(false);
      underTest.cell(2, 3).shouldBeHighlighted(false);

      underTest.cell(3, 0).shouldBeHighlighted(false);
      underTest.cell(3, 1).shouldBeHighlighted(false);
      underTest.cell(3, 2).shouldBeHighlighted(false);
      underTest.cell(3, 3).shouldBeHighlighted(true);
    });
  });
});

@Component({
  selector: "app-test-wrapper",
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

  onValueChange(_grid: SudokuGrid): void {}
  onValueSubmit(_grid: SudokuGrid): void {}
}
