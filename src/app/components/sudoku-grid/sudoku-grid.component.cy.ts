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
import { CyComponent, CyComponentInput } from "@cypress/types/cy-component";

type TestInput = Omit<CyComponentInput<SudokuGridWrapperComponent>, "grid"> & {
  grid: SudokuGrid;
  verification?: VerificationResult;
  highlightChangedCells?: boolean;
};

describe(SudokuGridComponent.name, () => {
  const underTest: CySudoku = new CySudoku();

  function setup(input: TestInput): CyComponent<SudokuGridWrapperComponent> {
    return new CyComponent(
      cy.mount(SudokuGridWrapperComponent, SudokuGridModule, {
        ...input,
        grid: createViewModel(input),
      }),
    );
  }

  function createViewModel(input: TestInput): SudokuGridViewModel {
    return SudokuGridViewModelConverter.createViewModelFromGrid(
      SudokuGridUtil.clone(input.grid),
      "Sudoku-Grid-Cy-Test",
      {
        branchInfo: { id: "test-id", isCurrent: false },
        verificationResult: input.verification,
        highlightChangedCells: input.highlightChangedCells ?? false,
      },
    );
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
      cell.shouldBeValid();
      cell.value.clear().blur();
      cell.shouldBeValid();

      // min allowed value
      cell.value.setValue(1);
      cell.shouldBeValid();
      cell.value.clear().blur();
      cell.shouldBeValid();

      // zero
      cell.value.setValue(0);
      cell.shouldBeValid(false);
      cell.value.clear().blur();
      cell.shouldBeValid();

      // negative number
      cell.value.setValue(-2);
      cell.shouldBeValid(false);
      cell.value.clear().blur();
      cell.shouldBeValid();

      // number which is too large
      cell.value.setValue(5);
      cell.shouldBeValid(false);
      cell.value.clear().blur();
      cell.shouldBeValid();

      cell.value
        .get()
        .should("be.enabled")
        .type("4")
        .should("have.value", "4")
        .type("1")
        .should("have.value", "41");
      cell.shouldBeValid(false);
      cell.value.clear().blur();
      cell.shouldBeValid();
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

  describe("changed values", () => {
    const testGrid: SudokuGrid = [
      [1, 2, 3, [4]],
      [3, undefined, 1, 2],
      [[2], [1, 3], [4], [1, 4]],
      [4, [1], 2, 3],
    ];

    it("should mark a cell as changed when it changes from one value to another", () => {
      const grid = SudokuGridUtil.clone(testGrid);
      const component = setup({
        grid: grid,
        highlightChangedCells: true,
      });
      underTest.cell(0, 0).shouldBeChanged(false);
      underTest.cell(1, 0).shouldBeChanged(false);

      // change cell and do NOT highlight change
      grid[1][0] = 2;
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: false,
        }),
      });
      underTest.cell(0, 0).shouldBeChanged(false);
      underTest.cell(1, 0).shouldBeChanged(false);

      // change cell and highlight change
      grid[0][0] = 2;
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: true,
        }),
      });
      underTest.cell(1, 0).shouldBeChanged(false);
      underTest.cell(0, 0).shouldBeChanged(true);
    });

    it("should mark a cell as changed when its possible values change", () => {
      const grid = SudokuGridUtil.clone(testGrid);
      const component = setup({
        grid: grid,
        highlightChangedCells: false,
      });
      underTest.cell(2, 1).shouldBeChanged(false);

      // change cell and do NOT highlight change
      grid[2][1] = [1, 2, 3];
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: false,
        }),
      });
      underTest.cell(2, 1).shouldBeChanged(false);

      // change cell and highlight change
      grid[2][1] = [1, 3];
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: true,
        }),
      });
      underTest.cell(2, 1).shouldBeChanged(true);
    });

    it("should NOT mark a cell as changed when undefined changes to a value", () => {
      const grid = SudokuGridUtil.clone(testGrid);
      const component = setup({
        grid: grid,
        highlightChangedCells: true,
      });
      underTest.cell(1, 1).shouldBeChanged(false);

      grid[1][1] = 4;
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: true,
        }),
      });
      underTest.cell(1, 1).shouldBeChanged(false);
    });

    it("should mark a cell as changed when undefined changes to possible values", () => {
      const grid = SudokuGridUtil.clone(testGrid);
      const component = setup({
        grid: grid,
        highlightChangedCells: true,
      });
      underTest.cell(1, 1).shouldBeChanged(false);

      grid[1][1] = [1];
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: true,
        }),
      });
      underTest.cell(1, 1).shouldBeChanged(true);
    });

    it("should mark a cell as changed when possible values change to real values", () => {
      const grid = SudokuGridUtil.clone(testGrid);
      const component = setup({
        grid: grid,
        highlightChangedCells: false,
      });

      underTest.cell(0, 3).shouldBeChanged(false);
      underTest.cell(2, 0).shouldBeChanged(false);

      grid[0][3] = 4;
      grid[2][0] = 2;
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: true,
        }),
      });
      underTest.cell(0, 3).shouldBeChanged(true);
      underTest.cell(2, 0).shouldBeChanged(true);
    });

    it("should mark a cell as changed when real values change to possible values", () => {
      const grid = SudokuGridUtil.clone(testGrid);
      const component = setup({
        grid: grid,
        highlightChangedCells: true,
      });
      underTest.cell(0, 0).shouldBeChanged(false);
      underTest.cell(3, 3).shouldBeChanged(false);

      grid[0][0] = [1];
      grid[3][3] = [3];
      component.setInput({
        grid: createViewModel({
          grid: grid,
          highlightChangedCells: true,
        }),
      });
      underTest.cell(0, 0).shouldBeChanged(true);
      underTest.cell(3, 3).shouldBeChanged(true);
    });

    it("should switch between previous and current value when hovering over changed cell", () => {
      cy.clock();
      const firstGrid = [
        [1, 2, 3, [4]],
        [3, undefined, 1, 2],
        [[2], [1, 3], [4], [1, 4]],
        [4, [1], 2, 3],
      ];
      const component = setup({
        grid: firstGrid,
        highlightChangedCells: false,
      });
      underTest.shouldEqual(firstGrid);
      const secondGrid = [
        [[2, 3], 2, 3, 4],
        [3, [1, 2, 3, 4], 1, 2],
        [[2], [1], [4], [1, 4]],
        [2, [1], 2, 3],
      ];
      component.setInput({
        grid: createViewModel({
          grid: secondGrid,
          highlightChangedCells: true,
        }),
      });

      underTest.cell(0, 0).shouldBeChanged(true);
      underTest.cell(0, 0).possibleValues.get().should("have.text", "23");
      underTest.cell(0, 0).get().trigger("mouseenter");
      cy.tick(501);
      underTest.cell(0, 0).value.get().should("have.value", "1");
      underTest.cell(0, 0).get().trigger("mouseleave");
      underTest.cell(0, 0).possibleValues.get().should("have.text", "23");

      underTest.cell(1, 1).shouldBeChanged(true);
      underTest.cell(1, 1).possibleValues.get().should("have.text", "1234");
      underTest.cell(1, 1).get().trigger("mouseenter");
      cy.tick(501);
      underTest.cell(1, 1).get().should("have.text", "");
      underTest.cell(1, 1).get().trigger("mouseleave");
      underTest.cell(1, 1).possibleValues.get().should("have.text", "1234");

      underTest.cell(0, 3).shouldBeChanged(true);
      underTest.cell(0, 3).value.get().should("have.value", "4");
      underTest.cell(0, 3).get().trigger("mouseenter");
      cy.tick(501);
      underTest.cell(0, 3).possibleValues.get().should("have.text", "4");
      underTest.cell(0, 3).get().trigger("mouseleave");
      underTest.cell(0, 3).value.get().should("have.value", "4");

      underTest.cell(2, 1).shouldBeChanged(true);
      underTest.cell(2, 1).possibleValues.get().should("have.text", "1");
      underTest.cell(2, 1).get().trigger("mouseenter");
      cy.tick(501);
      underTest.cell(2, 1).possibleValues.get().should("have.text", "13");
      underTest.cell(2, 1).get().trigger("mouseleave");
      underTest.cell(2, 1).possibleValues.get().should("have.text", "1");

      underTest.cell(3, 0).shouldBeChanged(true);
      underTest.cell(3, 0).value.get().should("have.value", "2");
      underTest.cell(3, 0).get().trigger("mouseenter");
      cy.tick(501);
      underTest.cell(3, 0).value.get().should("have.value", "4");
      underTest.cell(3, 0).get().trigger("mouseleave");
      underTest.cell(3, 0).value.get().should("have.value", "2");
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
