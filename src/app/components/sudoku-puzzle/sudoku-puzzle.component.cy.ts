import { Component, inject, Input } from "@angular/core";
import { appStoreImports } from "@app/app.module";
import { SudokuPuzzleActions } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.actions";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
import { SudokuPuzzleModule } from "@app/components/sudoku-puzzle/sudoku-puzzle.module";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { Puzzle9x9 } from "@app/test/puzzles/puzzle-9x9";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { CyComponentInput } from "@cypress/types/cy-component";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CyStateSwitch } from "@cypress/views/cy-state-switch";
import { Store } from "@ngrx/store";

describe(SudokuPuzzleComponent.name, () => {
  const underTest: CyPuzzleInput = new CyPuzzleInput();
  const stateSwitch: CyStateSwitch = new CyStateSwitch();

  function setup(input: CyComponentInput<SudokuPuzzleWrapperComponent>): void {
    cy.mount(SudokuPuzzleWrapperComponent, SudokuPuzzleModule, input, {
      imports: appStoreImports,
      providers: SOLVER_TEST_PROVIDERS,
    });
  }

  it("should have size selection, empty 9x9 grid and confirm button initially", () => {
    setup({});
    stateSwitch.buttonReopen.get().should("not.exist");
    stateSwitch.buttonConfirm.get().should("be.visible").should("be.enabled");

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

  it("should update the grid when cell change is submitted", () => {
    setup({ grid: Puzzle4x4.COMPLETE });

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
    setup({ grid: null });
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
    setup({ grid: PuzzleSimple.PUZZLE_1.puzzle });

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

  // Reactivate for SuSo-F-009 https://github.com/julia-jordan-712/sudoku-solver-angular/issues/42
  it.skip("should not mark cells as changed when switching between dropdowns", () => {
    // underTest.dropdown.dropdown.select("4x4 | Solved");

    for (let row = 0; row <= 3; row++) {
      for (let column = 0; column <= 3; column++) {
        underTest.sudoku.cell(row, column).shouldBeChanged(false);
      }
    }

    // underTest.dropdown.dropdown.select("4x4 | Empty");

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
class SudokuPuzzleWrapperComponent {
  private store: Store = inject(Store);
  @Input()
  set grid(grid: Nullable<SudokuGrid>) {
    this.store.dispatch(
      SudokuPuzzleActions.userSetSelectedOption({
        option: { id: null, data: grid },
      }),
    );
  }
}
