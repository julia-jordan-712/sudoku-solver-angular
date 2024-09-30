import { appStoreImports } from "@app/app.module";
import { MainComponent } from "@app/components/main/main.component";
import { MainModule } from "@app/components/main/main.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { CySelectionList } from "@cypress/selectors/cy-selection-list";
import { CyLanguageSelector } from "@cypress/views/cy-language-selector";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CySolver } from "@cypress/views/cy-solver";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";

describe(MainComponent.name, () => {
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
        providers: SOLVER_PROVIDERS,
      },
    );
  });

  it("should have all components", () => {
    puzzleInput.buttonReopen.get().should("not.exist");
    puzzleInput.buttonConfirm.get().should("be.visible");
    puzzleInput.dropdown.get().should("be.visible");
    puzzleInput.sizeSelector.get().should("be.visible");
    puzzleInput.sudoku.get().should("exist").should("not.be.visible");

    puzzleInput.dropdown.dropdown.get().select(3);
    puzzleInput.sudoku.get().should("be.visible");
    puzzleInput.sudoku.verification.valid.get().should("be.visible");
    puzzleInput.buttonConfirm.get().click();

    solverSettings.delay.input.get().should("be.visible");
    solverSettings.maxSteps.input.get().should("be.visible");
    solverSettings.pauseAtStep.input.get().should("be.visible");
    solverSettings.highlightNumber.input.get().should("be.visible");
    solverSettings.copySudoku.get().should("be.visible");

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

  describe("branches and steps", () => {
    beforeEach(() => {
      puzzleInput.selectFromDropdownAndConfirm("4x4 | Empty");
    });

    it("should show amount of executed steps and what the last step was", () => {
      solver.steps.get().should("contain.text", "Steps: 0");
      solver.steps.get().should("not.contain.text", "Last step:");

      solver.clickNext();

      solver.steps.get().should("contain.text", "Steps: 1");
      solver.steps
        .get()
        .should(
          "contain.text",
          "Last step: Determine possible values in empty cells",
        );
    });

    it("should show amount of required branches", () => {
      solver.branches.get().should("contain.text", "1");

      solver.clickNext();
      solver.branches.get().should("contain.text", "1");

      solver.clickNext();
      solver.branches.get().should("contain.text", "2");

      solver.clickNext();
      solver.branches.get().should("contain.text", "2");

      solver.clickNext();
      solver.branches.get().should("contain.text", "3");
    });
  });

  describe("enabling of solver buttons", () => {
    beforeEach(() => {
      puzzleInput.dropdown.dropdown.get().select("4x4 | Empty");
      puzzleInput.buttonConfirm.get().click();
      solverSettings.delay.input.setValue(200);
    });

    it("should allow to start initially", () => {
      solver.status.get().should("contain.text", "Ready to start");
      solver.actions.start.get().should("be.enabled");
      solver.actions.pause.get().should("be.disabled");
      solver.actions.next.get().should("be.enabled");
      solver.actions.restart.get().should("not.exist");
    });

    it("should allow to pause but not to go to next step while running", () => {
      solver.clickStart();

      solver.status.get().should("contain.text", "Calculating solution");
      solver.actions.start.get().should("be.disabled");
      solver.actions.pause.get().should("be.enabled");
      solver.actions.next.get().should("be.disabled");
      solver.actions.restart.get().should("not.exist");

      solver.clickPause();
    });

    it("should allow to continue and to go to next step while paused", () => {
      solver.clickStart();
      solver.clickPause();

      solver.status.get().should("contain.text", "Paused");
      solver.actions.start.get().should("be.enabled");
      solver.actions.pause.get().should("be.disabled");
      solver.actions.next.get().should("be.enabled");
      solver.actions.restart.get().should("not.exist");
    });

    it("should allow to continue and to go to next step after going to next step", () => {
      solver.clickNext();

      solver.status.get().should("contain.text", "Paused");
      solver.actions.start.get().should("be.enabled");
      solver.actions.pause.get().should("be.disabled");
      solver.actions.next.get().should("be.enabled");
      solver.actions.restart.get().should("not.exist");
    });

    it("should allow to pause again but not to go to next step after continuing", () => {
      solver.clickStart();
      solver.clickPause();
      solver.clickStart();

      solver.status.get().should("contain.text", "Calculating solution");
      solver.actions.start.get().should("be.disabled");
      solver.actions.pause.get().should("be.enabled");
      solver.actions.next.get().should("be.disabled");
      solver.actions.restart.get().should("not.exist");

      solver.clickPause();
    });

    it("should allow to restart when done", () => {
      solverSettings.delay.input.setValue(0);
      solver.clickStart();

      solver.steps.get().should("contain.text", "29");
      solver.status.get().should("contain.text", "Solution was found in");
      solver.actions.start.get().should("be.disabled");
      solver.actions.pause.get().should("be.disabled");
      solver.actions.next.get().should("be.disabled");
      solver.actions.restart.get().should("be.enabled");
    });
  });

  describe("maximum steps limit", () => {
    function selectEmptySudoku(): void {
      puzzleInput.dropdown.dropdown.get().select("4x4 | Empty");
      puzzleInput.buttonConfirm.get().click();
      solverSettings.maxSteps.input.setValue(4);
    }

    function selectNearlyDoneSudoku(): void {
      puzzleInput.dropdown.dropdown.get().select("4x4 | Solved");
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
      puzzleInput.dropdown.dropdown.get().select(4);
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
    puzzleInput.dropdown.dropdown.get().select("9x9 | Simple | Puzzle 3");
    puzzleInput.dropdown
      .get()
      .should("contain.text", "9x9 | Simple | Puzzle 3");
    puzzleInput.sizeSelector
      .text("9")
      .should("have.class", CySelectionList.CLASS_SELECTED);
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);

    // confirm and run solver
    puzzleInput.buttonConfirm.get().click();

    solver.actions.start.get().click();
    solver.status.shouldBe("DONE");
    solver.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.solution);

    // go back to puzzle input and assert previous state
    puzzleInput.buttonReopen.get().click();

    puzzleInput.buttonConfirm.get().should("be.enabled");
    puzzleInput.dropdown
      .get()
      .should("contain.text", "9x9 | Simple | Puzzle 3");
    puzzleInput.sizeSelector
      .text("9")
      .should("have.class", CySelectionList.CLASS_SELECTED);
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);
  });
});
