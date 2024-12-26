import { AppComponent } from "@app/app.component";
import { AppModule } from "@app/app.module";
import { CySelectionList } from "@cypress/selectors/cy-selection-list";
import { CyLanguageSelector } from "@cypress/views/cy-language-selector";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CySolver } from "@cypress/views/cy-solver";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";

describe(AppComponent.name, () => {
  beforeEach(() => {
    cy.mount(AppComponent, AppModule);
  });

  it("should create component", () => {
    cy.get("app-main").should("be.visible");
  });

  it("should allow to switch the language", () => {
    const language: CyLanguageSelector = new CyLanguageSelector();
    language.buttonEnglish.get().should("be.visible").should("be.enabled");
    language.buttonGerman.get().should("be.visible").should("be.enabled");

    cy.body().find("h1").should("contain.text", "Solve Sudoku");

    language.buttonGerman.get().click();
    cy.body().find("h1").should("contain.text", "Sudoku lösen");

    language.buttonEnglish.get().click();
    cy.body().find("h1").should("contain.text", "Solve Sudoku");
  });

  // Blocked by https://github.com/cypress-io/cypress/issues/28537
  it.skip("should reload all state correctly on page reload", () => {
    const puzzleInput: CyPuzzleInput = new CyPuzzleInput();
    const solver: CySolver = new CySolver();
    const solverSettings: CySolverSettings = new CySolverSettings();

    // change and pre-assert puzzle state
    puzzleInput.dropdown.dropdown.select("4x4 | Empty");
    puzzleInput.dropdown.get().should("contain.text", "4x4 | Empty");
    puzzleInput.sudoku.cell(0, 0).value.setValue(1);
    puzzleInput.sizeSelector
      .text("4")
      .should("have.class", CySelectionList.CLASS_SELECTED);
    puzzleInput.sudoku.verification.shouldBeValid();
    puzzleInput.buttonConfirm.get().click();

    // change and pre-assert settings
    solverSettings.maxSteps.input.setValue(777);
    solverSettings.highlightNumber.input.setValue(1);

    // solve and pre-assert solver state
    solver.actions.next.get().click();
    solver.actions.next.get().click();
    solver.status.shouldBe("PAUSED");
    solver.sudoku.cell(0, 0).value.get().should("have.value", 1);
    solver.sudoku.cell(0, 0).shouldBeHighlighted(true);
    solver.sudoku.cell(0, 0).shouldBeChanged(false);
    solver.sudoku.cell(0, 1).value.get().should("have.value", 2);
    solver.sudoku.cell(0, 1).shouldBeHighlighted(false);
    solver.sudoku.cell(0, 1).shouldBeChanged(true);
    solver.sudoku.cell(0, 2).possibleValues.get().should("have.text", "234");
    solver.sudoku.cell(0, 2).shouldBeHighlighted(false);
    solver.sudoku.cell(0, 2).shouldBeChanged(false);
    solver.additionalBranch(0).cell(0, 0).value.get().should("have.value", 1);
    solver.steps.get().should("contain.text", "Steps: 2");

    // pre-assert language selection
    new CyLanguageSelector().buttonGerman.get().click();
    cy.body().find("h1").should("contain.text", "Sudoku lösen");

    // act - reload page
    cy.reload();

    // assert same language state
    cy.body().find("h1").should("contain.text", "Sudoku lösen");

    // assert same solver state
    solver.status.shouldBe("PAUSED");
    solver.sudoku.cell(0, 0).value.get().should("have.value", 1);
    solver.sudoku.cell(0, 0).shouldBeHighlighted(true);
    solver.sudoku.cell(0, 0).shouldBeChanged(false);
    solver.sudoku.cell(0, 1).value.get().should("have.value", 2);
    solver.sudoku.cell(0, 1).shouldBeHighlighted(false);
    solver.sudoku.cell(0, 1).shouldBeChanged(true);
    solver.sudoku.cell(0, 2).possibleValues.get().should("have.text", "234");
    solver.sudoku.cell(0, 2).shouldBeHighlighted(false);
    solver.sudoku.cell(0, 2).shouldBeChanged(false);
    solver.additionalBranch(0).cell(0, 0).value.get().should("have.value", 1);
    solver.steps.get().should("contain.text", "Steps: 2");

    // assert settings
    solverSettings.delay.input.get().should("have.value", 0);
    solverSettings.maxSteps.input.get().should("have.value", 777);
    solverSettings.highlightNumber.input.get().should("have.value", 1);

    // assert puzzle state
    puzzleInput.buttonReopen.get().click();
    puzzleInput.dropdown.get().should("contain.text", "4x4 | Empty");
    puzzleInput.sudoku.cell(0, 0).value.get().should("have.value", 1);
    puzzleInput.sizeSelector
      .text("4")
      .should("have.class", CySelectionList.CLASS_SELECTED);
    puzzleInput.sudoku.verification.shouldBeValid();
  });
});
