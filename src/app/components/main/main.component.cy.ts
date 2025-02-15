import { appStoreImports } from "@app/app.module";
import { MainComponent } from "@app/components/main/main.component";
import { MainModule } from "@app/components/main/main.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { CyButtonWithIcon } from "@cypress/selectors/cy-button-with-icon";
import { CyDevFunctions } from "@cypress/views/cy-dev-functions";
import { CyLanguageSelector } from "@cypress/views/cy-language-selector";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CySolver } from "@cypress/views/cy-solver";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";
import { CyStateSwitch } from "@cypress/views/cy-state-switch";
import { PuzzleSimple } from "@test/puzzles/puzzle-simple";

describe(MainComponent.name, () => {
  const devFunctions: CyDevFunctions = new CyDevFunctions();
  const puzzleInput: CyPuzzleInput = new CyPuzzleInput();
  const stateSwitch: CyStateSwitch = new CyStateSwitch();
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
    stateSwitch.buttonReopen.get().should("not.exist");
    stateSwitch.buttonConfirm.get().should("be.visible");
    devFunctions.open.get().click();
    devFunctions.dropdown.get().should("be.visible");
    puzzleInput.sizeSelector.get().should("be.visible");
    puzzleInput.sudoku.get().should("be.visible");
    puzzleInput.sudoku.verification.shouldBeValid();
    stateSwitch.buttonConfirm.get().click();

    solverSettings.delay.input.get().should("be.visible");
    solverSettings.maxSteps.input.get().should("be.visible");
    solverSettings.pauseAtStep.input.get().should("be.visible");
    solverSettings.highlightNumber.input.get().should("be.visible");

    const languageSelector = new CyLanguageSelector();
    languageSelector.buttonEnglish.get().should("be.enabled");
    languageSelector.buttonEnglish.get().should("be.enabled");

    solver.actions.get().should("be.visible");
    solver.status.get().should("exist");
    solver.steps.get().should("exist");
    solver.branches.get().should("exist");
    solver.sudoku.get().should("be.visible");
    solver.additionalBranch(0).get().should("not.exist");
  });

  it("should re-initialize puzzle input with the previous state after confirm, solve and change-settings again", () => {
    // pre-assert puzzle input
    devFunctions.open.get().click();
    devFunctions.dropdown.dropdown.select("9x9 | Simple | Puzzle 3");
    devFunctions.dropdown
      .get()
      .should("contain.text", "9x9 | Simple | Puzzle 3");
    puzzleInput.sizeSelector.text("9").expect("selected");
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);

    // confirm and run solver
    stateSwitch.buttonConfirm.get().click();

    solver.actions.start.get().click();
    solver.status.shouldBe("DONE");
    solver.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.solution);
    solver.steps.get().should("contain.text", "Steps: 13");

    // go back to puzzle input and assert previous state
    stateSwitch.buttonReopen.get().click();

    stateSwitch.buttonConfirm.get().should("be.enabled");
    devFunctions.dropdown
      .get()
      .should("contain.text", "9x9 | Simple | Puzzle 3");
    puzzleInput.sizeSelector.text("9").expect("selected");
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_3.puzzle);
  });

  it("should show usage hints after clicking on 'help' button and be able to close them", () => {
    const helpButton = new CyButtonWithIcon({
      dataCy: "show-help",
      icon: "question",
    });
    helpButton.get().should("be.visible");
    helpButton.icon.get().should("be.visible");

    // initially: usage hints are not visible
    puzzleInput.hintList.hints.get().should("not.exist");
    stateSwitch.buttonConfirm.get().click();
    solver.hintList.hints.get().should("not.exist");

    // click on "help" button
    helpButton.get().click();
    solver.hintList.hints.get().should("be.visible");
    stateSwitch.buttonReopen.get().click();
    puzzleInput.hintList.hints.get().should("be.visible");

    // close usage hints
    puzzleInput.hintList.closeButton.get().click();
    puzzleInput.hintList.hints.get().should("not.exist");
    stateSwitch.buttonConfirm.get().click();
    solver.hintList.hints.get().should("not.exist");
  });
});
