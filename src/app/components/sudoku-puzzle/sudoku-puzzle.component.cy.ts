import { Component } from "@angular/core";
import { appStoreImports } from "@app/app.module";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
import { SudokuPuzzleModule } from "@app/components/sudoku-puzzle/sudoku-puzzle.module";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { Puzzle9x9 } from "@app/test/puzzles/puzzle-9x9";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CyStateSwitch } from "@cypress/views/cy-state-switch";

describe(SudokuPuzzleComponent.name, () => {
  const underTest: CyPuzzleInput = new CyPuzzleInput();
  const stateSwitch: CyStateSwitch = new CyStateSwitch();

  beforeEach(() => {
    cy.mount(
      SudokuPuzzleWrapperComponent,
      SudokuPuzzleModule,
      {},
      { imports: appStoreImports, providers: SOLVER_TEST_PROVIDERS },
    );
  });

  it("should have dropdown, size selection, empty 9x9 grid and confirm button initially", () => {
    stateSwitch.buttonReopen.get().should("not.exist");
    stateSwitch.buttonConfirm.get().should("be.visible").should("be.enabled");

    underTest.dropdown.get().should("be.visible");
    underTest.dropdown.label
      .get()
      .should("have.text", "Select existing Sudoku:");
    underTest.dropdown.icon.get().should("not.exist");
    underTest.dropdown.dropdown.expectSelected("-");

    underTest.sizeSelector.get().should("be.visible");
    underTest.sizeSelector.label.get().should("have.text", "Size:");
    underTest.sizeSelector.icon.get().should("not.exist");
    underTest.sizeSelector
      .index(0)
      .get()
      .should("be.visible")
      .should("be.enabled")
      .should("contain.text", "4");
    underTest.sizeSelector.index(0).expect("not.selected");
    underTest.sizeSelector
      .index(1)
      .get()
      .should("be.visible")
      .should("be.enabled")
      .should("contain.text", "9");
    underTest.sizeSelector.index(1).expect("selected");
    underTest.sizeSelector
      .index(2)
      .get()
      .should("be.visible")
      .should("be.enabled")
      .should("contain.text", "16");
    underTest.sizeSelector.index(2).expect("not.selected");
    underTest.sizeSelector
      .index(3)
      .get()
      .should("be.visible")
      .should("be.enabled")
      .should("contain.text", "25");
    underTest.sizeSelector.index(3).expect("not.selected");
    underTest.sizeSelector.index(4).get().should("not.exist");

    underTest.sudoku.get().should("be.visible");
    underTest.sudoku.shouldEqual(Puzzle9x9.EMPTY);
  });

  it("should update the grid and other fields when dropdown changes", () => {
    underTest.dropdown.dropdown.select("4x4 | Solved");

    underTest.sudoku.get().should("be.visible");
    underTest.sudoku.shouldEqual(Puzzle4x4.COMPLETE);
    underTest.sudoku.verification.shouldBeValid();
    stateSwitch.buttonConfirm.get().should("be.enabled");
    underTest.sizeSelector.text("4").expect("selected");
    underTest.sizeSelector.text("9").expect("not.selected");

    // change dropdown to different value
    underTest.dropdown.dropdown.unselect();

    underTest.sudoku.get().should("exist").should("not.be.visible");
    underTest.sudoku.verification.get().should("not.exist");
    stateSwitch.buttonConfirm.get().should("be.disabled");
    underTest.sizeSelector.text("4").expect("not.selected");
  });

  it("should update the grid when cell change is submitted", () => {
    underTest.dropdown.dropdown.select("4x4 | Solved");

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
    stateSwitch.buttonConfirm.get().should("be.disabled");

    underTest.sudoku.cell(3, 3).value.clear();

    underTest.sudoku.verification.shouldBeValid();
    underTest.sudoku.cell(3, 3).shouldBeDuplicate(false);
    stateSwitch.buttonConfirm.get().should("be.enabled");
  });

  it("should initialize an empty grid when only the size is set", () => {
    // pre-assert
    underTest.dropdown.dropdown.select(1); // anything
    underTest.dropdown.dropdown.unselect();
    underTest.sudoku.get().should("not.be.visible");
    stateSwitch.buttonConfirm.get().should("be.disabled");

    // act
    underTest.sizeSelector.text("4").get().click();

    // assert
    underTest.sudoku.shouldEqual(Puzzle4x4.EMPTY);
    underTest.sudoku.verification.shouldBeValid();
    stateSwitch.buttonConfirm.get().should("be.enabled");
    underTest.sizeSelector.text("4").expect("selected");
  });

  it("should update the grid when size changes", () => {
    underTest.dropdown.dropdown.select("9x9 | Simple | Puzzle 1");

    underTest.sudoku.shouldEqual(PuzzleSimple.PUZZLE_1.puzzle);

    underTest.sizeSelector.text("4").get().click();

    underTest.sudoku.shouldEqual([
      [undefined, 8, undefined, 4],
      [6, 4, 2, 8],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, 7, undefined],
    ]);

    underTest.sudoku.verification.shouldBeInvalid(
      "All numbers have to be ≥ 1 and ≤ 4.",
    );
    stateSwitch.buttonConfirm.get().should("be.disabled");

    underTest.sizeSelector.text("9").get().click();

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
    stateSwitch.buttonConfirm.get().should("be.enabled");
  });

  it("should not mark cells as changed when switching between dropdowns", () => {
    underTest.dropdown.dropdown.select("4x4 | Solved");

    for (let row = 0; row <= 3; row++) {
      for (let column = 0; column <= 3; column++) {
        underTest.sudoku.cell(row, column).shouldBeChanged(false);
      }
    }

    underTest.dropdown.dropdown.select("4x4 | Empty");

    for (let row = 0; row <= 3; row++) {
      for (let column = 0; column <= 3; column++) {
        underTest.sudoku.cell(row, column).shouldBeChanged(false);
      }
    }
  });
});

@Component({
  selector: "app-test-wrapper",
  template: `<app-sudoku-puzzle></app-sudoku-puzzle>`,
})
class SudokuPuzzleWrapperComponent {}
