import { appStoreImports } from "@app/app.module";
import { MainComponent } from "@app/components/main/main.component";
import { MainModule } from "@app/components/main/main.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { Puzzle9x9 } from "@app/test/puzzles/puzzle-9x9";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { CyDevFunctions } from "@cypress/views/cy-dev-functions";
import { CyLanguageSelector } from "@cypress/views/cy-language-selector";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CySolver } from "@cypress/views/cy-solver";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";

describe(MainComponent.name, () => {
  const devFunctions: CyDevFunctions = new CyDevFunctions();
  const puzzleInput: CyPuzzleInput = new CyPuzzleInput();
  const solverSettings: CySolverSettings = new CySolverSettings();
  const solver: CySolver = new CySolver();

  beforeEach(() => {
    cy.mount(
      MainComponent,
      MainModule,
      {},
      {
        imports: appStoreImports,
        providers: [...SOLVER_PROVIDERS],
      },
    );
  });

  it("should have all components", () => {
    puzzleInput.buttonReopen.get().should("not.exist");
    puzzleInput.buttonConfirm.get().should("be.visible");
    puzzleInput.dropdown.get().should("be.visible");
    puzzleInput.sizeSelector.get().should("be.visible");
    puzzleInput.sudoku.get().should("be.visible");
    puzzleInput.sudoku.verification.valid.get().should("be.visible");
    puzzleInput.buttonConfirm.get().click();

    solverSettings.delay.input.get().should("be.visible");
    solverSettings.maxSteps.input.get().should("be.visible");
    solverSettings.pauseAtStep.input.get().should("be.visible");
    solverSettings.highlightNumber.input.get().should("be.visible");

    const languageSelector = new CyLanguageSelector();
    languageSelector.buttonEnglish.get().should("be.enabled");
    languageSelector.buttonEnglish.get().should("be.enabled");

    solver.actions.get().should("be.visible");
    solver.status.get().should("be.visible");
    solver.steps.get().should("be.visible");
    solver.branches.get().should("be.visible");
    solver.sudoku.get().should("be.visible");
    solver.additionalBranch(0).get().should("not.exist");
  });

  describe("maximum steps limit", () => {
    function selectEmptySudoku(): void {
      puzzleInput.dropdown.dropdown.select("4x4 | Empty");
      puzzleInput.buttonConfirm.get().click();
      solverSettings.maxSteps.input.setValue(4);
    }

    function selectNearlyDoneSudoku(): void {
      puzzleInput.dropdown.dropdown.select("4x4 | Solved");
      puzzleInput.sudoku
        .cell(0, 0)
        .value.get()
        .should("have.value", "1")
        .clear();
      puzzleInput.buttonConfirm.get().click();
      solverSettings.maxSteps.input.setValue(4);
    }

    describe("when running", () => {
      it("should succeed if solution is found", () => {
        selectNearlyDoneSudoku();
        solver.clickStart();
        solver.status.shouldBe("DONE");
      });

      it("should fail after the maximum amount of steps if no solution is found", () => {
        selectEmptySudoku();
        solver.clickStart();
        solver.status.shouldBe("FAILED");
      });
    });

    describe("when going to next step", () => {
      it("should succeed if solution is found", () => {
        selectNearlyDoneSudoku();
        solver.clickNext();
        solver.status.shouldBe("PAUSED");
        solver.clickNext();
        solver.clickNext();
        solver.status.shouldBe("DONE");
      });

      it("should fail after the maximum amount of steps if no solution is found", () => {
        selectEmptySudoku();
        solver.clickNext();
        solver.clickNext();
        solver.clickNext();
        solver.status.shouldBe("PAUSED");
        solver.clickNext();
        solver.status.shouldBe("FAILED");
      });
    });
  });

  describe("pause after step", () => {
    beforeEach(() => {
      puzzleInput.dropdown.dropdown.select(4);
      puzzleInput.buttonConfirm.get().click();

      solverSettings.maxSteps.input.setValue(4);
      solverSettings.pauseAtStep.input.setValue(2);
    });

    it("should pause when the step is reached and allow to continue running", () => {
      solver.clickStart();

      solver.status.shouldBe("PAUSED");
      solver.steps.get().should("contain.text", "Steps: 2");

      solver.actions.start.get().should("be.enabled");
      solver.actions.pause.get().should("be.disabled");
      solver.actions.next.get().should("be.enabled");
    });

    it("should not make a difference if already paused", () => {
      solver.clickNext();
      solver.status.shouldBe("PAUSED");
      solver.steps.get().should("contain.text", "Steps: 1");

      solver.clickNext();
      solver.status.shouldBe("PAUSED");
      solver.steps.get().should("contain.text", "Steps: 2");

      solver.clickNext();
      solver.status.shouldBe("PAUSED");
      solver.steps.get().should("contain.text", "Steps: 3");
    });
  });

  it("should re-initialize puzzle input with the previous state after confirm, solve and change-settings again", () => {
    // pre-assert puzzle input
    puzzleInput.dropdown.dropdown.select("9x9 | Simple | Puzzle 3");
    puzzleInput.dropdown
      .get()
      .should("contain.text", "9x9 | Simple | Puzzle 3");
    puzzleInput.sizeSelector.text("9").expect("selected");
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);

    // confirm and run solver
    puzzleInput.buttonConfirm.get().click();

    solver.actions.start.get().click();
    solver.status.shouldBe("DONE");
    solver.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.solution);
    solver.steps.get().should("contain.text", "Steps: 13");

    // go back to puzzle input and assert previous state
    puzzleInput.buttonReopen.get().click();

    puzzleInput.buttonConfirm.get().should("be.enabled");
    puzzleInput.dropdown
      .get()
      .should("contain.text", "9x9 | Simple | Puzzle 3");
    puzzleInput.sizeSelector.text("9").expect("selected");
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);
  });

  it("should reset to initial state when clicking button", () => {
    // pre-act setup some state
    puzzleInput.dropdown.dropdown.select("4x4 | Empty");
    puzzleInput.buttonConfirm.get().click();

    // pre-assert
    puzzleInput.dropdown.get().should("not.exist");
    puzzleInput.sizeSelector.get().should("not.exist");
    solver.actions.get().should("be.visible");
    solver.sudoku.shouldEqual(Puzzle4x4.EMPTY);

    // act
    devFunctions.clearState.get().click();

    // assert
    solver.actions.get().should("not.exist");
    puzzleInput.dropdown.dropdown.expectSelected("-");
    puzzleInput.sizeSelector.text("9").expect("selected");
    puzzleInput.sudoku.shouldEqual(Puzzle9x9.EMPTY);
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.buttonConfirm.get().should("be.enabled");
  });

  describe("paste sudoku", () => {
    it("should work only in puzzle mode", () => {
      puzzleInput.buttonConfirm.get().should("be.enabled");
      devFunctions.pasteSudoku.get().should("be.enabled");

      puzzleInput.buttonConfirm.get().click();
      puzzleInput.buttonConfirm.get().should("not.exist");
      devFunctions.pasteSudoku.get().should("be.disabled");

      puzzleInput.buttonReopen.get().click();
      puzzleInput.buttonConfirm.get().should("exist");
      devFunctions.pasteSudoku.get().should("be.enabled");
    });

    // this test does not work like this due to https://github.com/cypress-io/cypress/issues/18198
    it.skip("should allow to paste a sudoku grid from the clipboard and update the rest of the state accordingly", () => {
      // arrange
      puzzleInput.dropdown.dropdown.select("9x9 | Simple | Puzzle 2");
      devFunctions.copySudoku.get().click();

      // pre-assert
      puzzleInput.dropdown.dropdown.select("4x4 | Empty");
      puzzleInput.sudoku.shouldEqual(Puzzle4x4.EMPTY);
      puzzleInput.sizeSelector.text("4").expect("selected");
      puzzleInput.sizeSelector.text("9").expect("not.selected");

      // act
      devFunctions.pasteSudoku.get().click();

      // assert
      puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_2.puzzle);
      puzzleInput.sizeSelector.text("4").expect("not.selected");
      puzzleInput.sizeSelector.text("9").expect("selected");
      puzzleInput.dropdown.dropdown.expectSelected("-");
    });
  });
});
