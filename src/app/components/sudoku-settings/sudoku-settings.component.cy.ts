import { Component } from "@angular/core";
import { SudokuSettingsModule } from "@app/components/sudoku-settings/sudoku-settings.module";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SUDOKU_SOLVER_STATE_MOCK_PROVIDER } from "@app/test/solver/sudoku-solver-state-mock.service";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { SudokuSettingsComponent } from "./sudoku-settings.component";

describe(SudokuSettingsComponent.name, () => {
  const underTest: CyPuzzleInput = new CyPuzzleInput();

  beforeEach(() => {
    cy.mount(
      SudokuSettingsWrapperComponent,
      SudokuSettingsModule,
      {},
      {
        providers: [
          ...SOLVER_TEST_PROVIDERS,
          ...SUDOKU_SOLVER_STATE_MOCK_PROVIDER,
        ],
      },
    );
  });

  it("should have dropdown, size selection and confirm button initially", () => {
    underTest.buttonReopen.get().should("not.exist");
    underTest.buttonConfirm.get().should("be.visible").should("be.disabled");

    underTest.dropdown.get().should("be.visible");
    underTest.dropdown.label
      .get()
      .should("have.text", "Select existing Sudoku:");
    underTest.dropdown.icon.get().should("not.exist");
    underTest.dropdown.dropdown.get().should("contain.text", "-");

    underTest.sizeSelector.get().should("be.visible");
    underTest.sizeSelector.label.get().should("have.text", "Size:");
    underTest.sizeSelector.icon.get().should("not.exist");
    underTest.sizeSelector
      .button(0)
      .should("be.visible")
      .should("be.enabled")
      .should("not.have.class", "selected")
      .should("contain.text", "4");
    underTest.sizeSelector
      .button(1)
      .should("be.visible")
      .should("be.enabled")
      .should("not.have.class", "selected")
      .should("contain.text", "9");
    underTest.sizeSelector
      .button(2)
      .should("be.visible")
      .should("be.enabled")
      .should("not.have.class", "selected")
      .should("contain.text", "16");
    underTest.sizeSelector
      .button(3)
      .should("be.visible")
      .should("be.enabled")
      .should("not.have.class", "selected")
      .should("contain.text", "25");
    underTest.sizeSelector.button(4).should("not.exist");

    underTest.sudoku.get().should("exist").should("not.be.visible");
  });

  it("should update the grid when dropdown changes", () => {
    underTest.dropdown.dropdown.get().select("4x4 | Solved");

    underTest.sudoku.get().should("be.visible");
    underTest.sudoku.shouldEqual(Puzzle4x4.COMPLETE);
    underTest.sudoku.verification.shouldBeValid();

    underTest.buttonConfirm.get().should("be.enabled");

    underTest.sizeSelector
      .button(0)
      .should("contain.text", "4")
      .should("have.class", "selected");
    underTest.sizeSelector
      .button(1)
      .should("contain.text", "9")
      .should("not.have.class", "selected");
  });

  it("should update the grid when cell change is submitted", () => {
    underTest.dropdown.dropdown.get().select("4x4 | Solved");

    /**
     * Enter 4 in last cell => value 4 is duplicated in
     * - last column: first row and last row -> position (0,3) and (3,3)
     * - last row: first column and last column -> position (3,0) and (3,3)
     * - last square: position (2,2) and (3,3)
     */
    underTest.sudoku.cell(3, 3).value.setValue(4);

    underTest.sudoku.verification.shouldBeInvalid("duplicates");
    underTest.sudoku.cell(0, 3).shouldBeDuplicate();
    underTest.sudoku.cell(2, 2).shouldBeDuplicate();
    underTest.sudoku.cell(3, 0).shouldBeDuplicate();
    underTest.sudoku.cell(3, 3).shouldBeDuplicate();
    underTest.buttonConfirm.get().should("be.disabled");

    underTest.sudoku.cell(3, 3).value.clear();

    underTest.sudoku.verification.shouldBeValid();
    underTest.sudoku.cell(3, 3).shouldBeDuplicate(false);
    underTest.buttonConfirm.get().should("be.enabled");
  });

  it("should update the grid when size changes", () => {
    underTest.dropdown.dropdown.get().select("9x9 | Simple | Puzzle 1");

    underTest.sudoku.shouldEqual(PuzzleSimple.PUZZLE_1.puzzle);

    underTest.sizeSelector.button(0).should("contain.text", "4").click();

    underTest.sudoku.shouldEqual([
      [undefined, 8, undefined, 4],
      [6, 4, 2, 8],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, 7, undefined],
    ]);

    underTest.sudoku.verification.shouldBeInvalid(
      "All numbers have to be ≥ 1 and ≤ 4.",
    );
    underTest.buttonConfirm.get().should("be.disabled");

    underTest.sizeSelector.button(1).should("contain.text", "9").click();

    underTest.sudoku.shouldEqual([
      [
        undefined,
        8,
        undefined,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [6, 4, 2, 8, undefined, undefined, undefined, undefined, undefined],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        7,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
    ]);
    underTest.buttonConfirm.get().should("be.enabled");
  });

  it("should re-initialize with the previous state after confirm and change-settings again", () => {
    underTest.dropdown.dropdown.get().select("9x9 | Simple | Puzzle 3");
    underTest.buttonConfirm.get().should("be.enabled");
    underTest.dropdown.get().should("contain.text", "9x9 | Simple | Puzzle 3");
    underTest.sizeSelector
      .button(1)
      .should("contain.text", "9")
      .should("have.class", "selected");
    underTest.sudoku.verification.shouldBeValid();
    underTest.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);

    underTest.buttonConfirm.get().click();

    underTest.buttonReopen.get().should("be.visible").should("be.enabled");
    underTest.buttonConfirm.get().should("not.exist");
    underTest.dropdown.get().should("not.exist");
    underTest.sizeSelector.get().should("not.exist");
    underTest.sudoku.get().should("not.exist");

    underTest.buttonReopen.get().click();

    underTest.buttonReopen.get().should("not.exist");
    underTest.buttonConfirm.get().should("be.enabled");
    underTest.dropdown.get().should("contain.text", "9x9 | Simple | Puzzle 3");
    underTest.sizeSelector
      .button(1)
      .should("contain.text", "9")
      .should("have.class", "selected");
    underTest.sudoku.verification.shouldBeValid();
    underTest.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);
  });

  it("should not mark cells as changed when switching between dropdowns", () => {
    underTest.dropdown.dropdown.get().select("4x4 | Solved");

    for (let row = 0; row <= 3; row++) {
      for (let column = 0; column <= 3; column++) {
        underTest.sudoku.cell(row, column).shouldBeChanged(false);
      }
    }

    underTest.dropdown.dropdown.get().select("4x4 | Empty");

    for (let row = 0; row <= 3; row++) {
      for (let column = 0; column <= 3; column++) {
        underTest.sudoku.cell(row, column).shouldBeChanged(false);
      }
    }
  });
});

@Component({
  selector: "app-test-wrapper",
  template: `<app-sudoku-settings></app-sudoku-settings>`,
})
class SudokuSettingsWrapperComponent {}
