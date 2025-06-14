import { Component, OnInit, inject } from "@angular/core";
import { appStoreImports } from "@app/app.module";
import { DevelopmentFunctionsComponent } from "@app/components/development/development-functions/development-functions.component";
import { MainComponent } from "@app/components/main/main.component";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { ClipboardService } from "@app/core/clipboard/clipboard.service";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { CyDevFunctions } from "@cypress/views/cy-dev-functions";
import { CyPuzzleInput } from "@cypress/views/cy-puzzle-input";
import { CySolver } from "@cypress/views/cy-solver";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";
import { CyStateSwitch } from "@cypress/views/cy-state-switch";
import { Store } from "@ngrx/store";
import { ClipboardServiceMock } from "@test/clipboard/clipboard-service.mock";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { Puzzle9x9 } from "@test/puzzles/puzzle-9x9";
import { PuzzleSimple } from "@test/puzzles/puzzle-simple";

describe(DevelopmentFunctionsComponent.name, () => {
  const devFunctions: CyDevFunctions = new CyDevFunctions();
  const puzzleInput: CyPuzzleInput = new CyPuzzleInput();
  const stateSwitch: CyStateSwitch = new CyStateSwitch();
  const solverSettings: CySolverSettings = new CySolverSettings();
  const solver: CySolver = new CySolver();

  beforeEach(() => {
    cy.mount(
      MainWrapperComponent,
      {},
      {
        imports: appStoreImports,
        providers: [
          ...SOLVER_PROVIDERS,
          { provide: ClipboardService, useClass: ClipboardServiceMock },
        ],
      },
    );
  });

  function openDevFunctions(): void {
    devFunctions.open.get().click();
  }

  it("should show development function after clicking on button and be able to close them", () => {
    // development functions are not visible
    devFunctions.clearState.get().should("not.exist");
    devFunctions.close.get().should("not.exist");
    devFunctions.copySudoku.get().should("not.exist");
    devFunctions.dropdown.get().should("not.exist");
    devFunctions.pasteSudoku.get().should("not.exist");

    // button to open development functions is visible
    devFunctions.open.get().should("be.visible");
    devFunctions.open.get().click();

    // development functions are visible
    devFunctions.clearState.get().should("be.visible");
    devFunctions.close.get().should("be.visible");
    devFunctions.copySudoku.get().should("be.visible");
    devFunctions.dropdown.get().should("be.visible");
    devFunctions.pasteSudoku.get().should("be.visible");

    // close development functions
    devFunctions.close.get().click();

    devFunctions.clearState.get().should("not.exist");
    devFunctions.close.get().should("not.exist");
    devFunctions.copySudoku.get().should("not.exist");
    devFunctions.dropdown.get().should("not.exist");
    devFunctions.pasteSudoku.get().should("not.exist");
  });

  describe("maximum steps limit", () => {
    beforeEach(() => openDevFunctions());

    function selectEmptySudoku(): void {
      devFunctions.dropdown.dropdown.select("4x4 | Empty");
      stateSwitch.buttonConfirm.get().click();
      solverSettings.maxSteps.input.setValue(4);
    }

    function selectNearlyDoneSudoku(): void {
      devFunctions.dropdown.dropdown.select("4x4 | Solved");
      puzzleInput.sudoku
        .cell(0, 0)
        .value.get()
        .should("have.value", "1")
        .clear();
      stateSwitch.buttonConfirm.get().click();
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
      openDevFunctions();
      devFunctions.dropdown.dropdown.select(4);
      stateSwitch.buttonConfirm.get().click();

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

  it("should reset to initial state when clicking button", () => {
    // pre-act setup some state
    openDevFunctions();
    devFunctions.dropdown.dropdown.select("4x4 | Empty");
    stateSwitch.buttonConfirm.get().click();

    // pre-assert
    puzzleInput.sizeSelector.get().should("not.exist");
    solver.actions.get().should("be.visible");
    solver.sudoku.shouldEqual(Puzzle4x4.EMPTY);

    // act
    devFunctions.clearState.get().click();
    devFunctions.clearState.get().should("not.exist");
    openDevFunctions();

    // assert
    solver.actions.get().should("not.exist");
    devFunctions.dropdown.dropdown.expectSelected("-");
    puzzleInput.sizeSelector.text("9").expect("selected");
    puzzleInput.sudoku.shouldEqual(Puzzle9x9.EMPTY);
    puzzleInput.sudoku.verification.shouldBeValid();
    stateSwitch.buttonConfirm.get().should("be.enabled");
  });

  describe("paste sudoku", () => {
    beforeEach(() => openDevFunctions());

    it("should work only in puzzle mode", () => {
      stateSwitch.buttonConfirm.get().should("be.enabled");
      devFunctions.pasteSudoku.get().should("be.enabled");

      stateSwitch.buttonConfirm.get().click();
      stateSwitch.buttonConfirm.get().should("not.exist");
      devFunctions.pasteSudoku.get().should("be.disabled");

      stateSwitch.buttonReopen.get().click({ force: true });
      stateSwitch.buttonConfirm.get().should("exist");
      devFunctions.pasteSudoku.get().should("be.enabled");
    });

    it("should allow to paste a sudoku grid from the clipboard and update the rest of the state accordingly", () => {
      // arrange
      devFunctions.dropdown.dropdown.select("9x9 | Simple | Puzzle 2");
      devFunctions.copySudoku.get().click();

      // pre-assert
      devFunctions.dropdown.dropdown.select("4x4 | Empty");
      puzzleInput.sudoku.shouldEqual(Puzzle4x4.EMPTY);
      puzzleInput.sizeSelector.text("4").expect("selected");
      puzzleInput.sizeSelector.text("9").expect("not.selected");

      // act
      devFunctions.pasteSudoku.get().click();

      // assert
      puzzleInput.sudoku.shouldEqual(PuzzleSimple.PUZZLE_2.puzzle);
      puzzleInput.sizeSelector.text("4").expect("not.selected");
      puzzleInput.sizeSelector.text("9").expect("selected");
      devFunctions.dropdown.dropdown.expectSelected("-");
    });
  });

  describe("test sudokus", () => {
    beforeEach(() => openDevFunctions());

    it("should update the grid and other fields when dropdown changes", () => {
      devFunctions.dropdown.dropdown.select("4x4 | Solved");

      puzzleInput.sudoku.get().should("be.visible");
      puzzleInput.sudoku.shouldEqual(Puzzle4x4.COMPLETE);
      puzzleInput.sudoku.verification.shouldBeValid();
      stateSwitch.buttonConfirm.get().should("be.enabled");
      puzzleInput.sizeSelector.text("4").expect("selected");
      puzzleInput.sizeSelector.text("9").expect("not.selected");

      // change dropdown to different value
      devFunctions.dropdown.dropdown.unselect();

      puzzleInput.sudoku.get().should("exist").should("not.be.visible");
      puzzleInput.sudoku.verification.get().should("not.exist");
      stateSwitch.buttonConfirm.get().should("be.disabled");
      puzzleInput.sizeSelector.text("4").expect("not.selected");
    });
  });
});

@Component({
  selector: "app-test-wrapper",
  template: `<app-main></app-main>`,
  standalone: true,
  imports: [MainComponent],
})
class MainWrapperComponent implements OnInit {
  private store: Store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(SudokuSolverActions.setDelay({ delay: 0 }));
  }
}
