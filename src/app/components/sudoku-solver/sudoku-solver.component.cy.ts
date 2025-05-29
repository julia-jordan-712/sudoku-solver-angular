import { Component, inject, Input, OnChanges } from "@angular/core";
import { appStoreImports } from "@app/app.module";
import { SudokuPuzzleSolverSwitchActions } from "@app/components/sudoku-puzzle-solver-switch/state/sudoku-puzzle-solver-switch.actions";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { SudokuSolverComponent } from "@app/components/sudoku-solver/sudoku-solver.component";
import { SudokuSolverModule } from "@app/components/sudoku-solver/sudoku-solver.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { CyComponentInput } from "@cypress/types/cy-component";
import { CySolver } from "@cypress/views/cy-solver";
import { Store } from "@ngrx/store";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { PuzzleExtreme } from "@test/puzzles/puzzle-extreme";

describe(SudokuSolverComponent.name, () => {
  const underTest: CySolver = new CySolver();

  function setup(input: CyComponentInput<SudokuSolverWrapperComponent>): void {
    cy.mount(SudokuSolverWrapperComponent, SudokuSolverModule, input, {
      imports: appStoreImports,
      providers: SOLVER_PROVIDERS,
    });
  }

  describe("branches and steps", () => {
    beforeEach(() => {
      setup({ grid: Puzzle4x4.EMPTY });
    });

    it("should show amount of executed steps and what the last step was", () => {
      underTest.steps.get().should("contain.text", "Steps: 0");
      underTest.steps.get().should("contain.text", "Last step: -");

      underTest.clickNext();

      underTest.steps.get().should("contain.text", "Steps: 1");
      underTest.steps
        .get()
        .should(
          "contain.text",
          "Last step: Determine possible values in empty cells",
        );
    });

    it("should show amount of required branches", () => {
      underTest.branches.get().should("contain.text", "1");

      underTest.clickNext();
      underTest.branches.get().should("contain.text", "1");

      underTest.clickNext();
      underTest.branches.get().should("contain.text", "2");

      underTest.clickNext();
      underTest.branches.get().should("contain.text", "2");

      underTest.clickNext();
      underTest.branches.get().should("contain.text", "3");
    });
  });

  describe("solver action buttons", () => {
    it("should allow to start initially", () => {
      setup({ grid: Puzzle4x4.EMPTY });
      underTest.status.get().should("contain.text", "Ready to start");
      underTest.actions.start.get().should("be.enabled");
      underTest.actions.pause.get().should("be.disabled");
      underTest.actions.next.get().should("be.enabled");
      underTest.actions.restart.get().should("not.exist");
    });

    it("should allow to pause but not to go to next step while running", () => {
      setup({ grid: Puzzle4x4.EMPTY, delay: 1000 });
      underTest.clickStart();

      underTest.status.get().should("contain.text", "Calculating solution");
      underTest.actions.start.get().should("be.disabled");
      underTest.actions.pause.get().should("be.enabled");
      underTest.actions.next.get().should("be.disabled");
      underTest.actions.restart.get().should("not.exist");

      underTest.clickPause();
    });

    it("should allow to continue and to go to next step while paused", () => {
      setup({ grid: Puzzle4x4.EMPTY, delay: 1000 });
      underTest.clickStart();
      underTest.clickPause();

      underTest.status.get().should("contain.text", "Paused");
      underTest.actions.start.get().should("be.enabled");
      underTest.actions.pause.get().should("be.disabled");
      underTest.actions.next.get().should("be.enabled");
      underTest.actions.restart.get().should("not.exist");
    });

    it("should allow to continue and to go to next step after going to next step", () => {
      setup({ grid: Puzzle4x4.EMPTY });
      underTest.clickNext();

      underTest.status.get().should("contain.text", "Paused");
      underTest.actions.start.get().should("be.enabled");
      underTest.actions.pause.get().should("be.disabled");
      underTest.actions.next.get().should("be.enabled");
      underTest.actions.restart.get().should("not.exist");
    });

    it("should allow to pause again but not to go to next step after continuing", () => {
      setup({ grid: Puzzle4x4.EMPTY, delay: 200 });
      underTest.clickStart();
      underTest.clickPause();
      underTest.clickStart();

      underTest.status.get().should("contain.text", "Calculating solution");
      underTest.actions.start.get().should("be.disabled");
      underTest.actions.pause.get().should("be.enabled");
      underTest.actions.next.get().should("be.disabled");
      underTest.actions.restart.get().should("not.exist");

      underTest.clickPause();
    });

    it("should allow to restart when done", () => {
      setup({ grid: Puzzle4x4.EMPTY });
      underTest.clickStart();

      underTest.steps.get().should("contain.text", "29");
      underTest.status.get().should("contain.text", "Solution was found in");
      underTest.actions.start.get().should("be.disabled");
      underTest.actions.pause.get().should("be.disabled");
      underTest.actions.next.get().should("be.disabled");
      underTest.actions.restart.get().should("be.enabled");

      underTest.sudoku.shouldEqual([
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1],
      ]);
      underTest.sudoku.verification.shouldBeValid();
    });
  });

  describe("speed buttons", () => {
    it("should disable the 'normal speed' button when in normal speed", () => {
      setup({ grid: PuzzleExtreme.PUZZLE_4.puzzle });

      underTest.speed.normal.get().click();
      underTest.speed.normal.get().should("be.disabled");

      underTest.speed.slower.get().click();
      underTest.speed.normal.get().should("be.enabled");

      underTest.speed.normal.get().click();
      underTest.speed.normal.get().should("be.disabled");

      underTest.speed.faster.get().click();
      underTest.speed.normal.get().should("be.enabled");
    });

    it("should disable the 'faster speed' button when delay is zero", () => {
      setup({ grid: PuzzleExtreme.PUZZLE_4.puzzle, delay: 0 });
      underTest.speed.faster.get().should("be.disabled");
      underTest.speed.slower.get().click();
      underTest.speed.faster.get().should("be.enabled");
    });
  });
});

@Component({
  selector: "app-test-wrapper",
  template: `<app-sudoku-solver></app-sudoku-solver>`,
})
class SudokuSolverWrapperComponent implements OnChanges {
  private store: Store = inject(Store);

  @Input()
  delay = 0;

  @Input()
  grid: Nullable<SudokuGrid>;

  @Input()
  maxSteps = 1000;

  @Input()
  pause: number | undefined;

  ngOnChanges(): void {
    this.store.dispatch(SudokuPuzzleSolverSwitchActions.submitPuzzle());
    this.store.dispatch(SudokuSolverActions.setDelay({ delay: this.delay }));
    this.store.dispatch(
      SudokuSolverActions.setMaximumSteps({ maxSteps: this.maxSteps }),
    );
    this.store.dispatch(
      SudokuSolverActions.setStepToBePausedAfter({ pauseStep: this.pause }),
    );
    if (this.grid) {
      this.store.dispatch(
        SudokuSolverActions.setInitialPuzzle({ puzzle: this.grid }),
      );
    }
  }
}
