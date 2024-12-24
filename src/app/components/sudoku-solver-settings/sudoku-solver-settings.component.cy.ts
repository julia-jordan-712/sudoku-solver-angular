import { Component, inject, Input, OnChanges } from "@angular/core";
import { appStoreImports } from "@app/app.module";
import { SudokuSolverSettingsComponent } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.component";
import { SudokuSolverSettingsModule } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.module";
import { SudokuSolverActions } from "@app/components/sudoku-solver/state/sudoku-solver.actions";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { CyComponentInput } from "@cypress/types/cy-component";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";
import { Store } from "@ngrx/store";

describe(SudokuSolverSettingsComponent.name, () => {
  const underTest: CySolverSettings = new CySolverSettings();

  function setup(
    input: CyComponentInput<SudokuSolverSettingsWrapperComponent>,
  ): void {
    cy.mount(
      SudokuSolverSettingsWrapperComponent,
      SudokuSolverSettingsModule,
      input,
      {
        imports: appStoreImports,
        providers: SOLVER_TEST_PROVIDERS,
      },
    );
  }

  it("should not display anything if there is no sudoku", () => {
    setup({ grid: null });
    underTest.delay.get().should("not.exist");
    underTest.maxSteps.get().should("not.exist");
    underTest.pauseAtStep.get().should("not.exist");
    underTest.highlightNumber.get().should("not.exist");
  });

  it("should display an input field for the delay", () => {
    setup({ grid: Puzzle4x4.COMPLETE, delay: 100 });
    underTest.delay.label.get().should("have.text", "Delay:");
    underTest.delay.icon.get().should("be.visible");
    underTest.delay.icon
      .get()
      .invoke("attr", "title")
      .should("contain", "between steps");
    underTest.delay.input
      .get()
      .should("be.enabled")
      .should("have.value", "100");
  });

  it("should display an input field for the maximum steps", () => {
    setup({ grid: Puzzle4x4.COMPLETE, maxSteps: 10000 });
    underTest.maxSteps.label.get().should("have.text", "Maximum steps:");
    underTest.maxSteps.icon.get().should("be.visible");
    underTest.maxSteps.icon
      .get()
      .invoke("attr", "title")
      .should("contain", "prevents an infinite-loop");
    underTest.maxSteps.input
      .get()
      .should("be.enabled")
      .should("have.value", "10000");
  });

  it("should display an input field for the step to pause at", () => {
    setup({ grid: Puzzle4x4.COMPLETE, pause: 7 });
    underTest.pauseAtStep.label.get().should("have.text", "Pause at step:");
    underTest.pauseAtStep.icon.get().should("be.visible");
    underTest.pauseAtStep.icon
      .get()
      .invoke("attr", "title")
      .should("contain", "when the specified step is reached");
    underTest.pauseAtStep.input
      .get()
      .should("be.enabled")
      .should("have.value", "7");
  });

  it("should display an input field for highlighting a number", () => {
    setup({ grid: Puzzle4x4.COMPLETE, highlight: 2 });
    underTest.highlightNumber.label
      .get()
      .should("have.text", "Highlight number:");
    underTest.highlightNumber.icon.get().should("be.visible");
    underTest.highlightNumber.icon
      .get()
      .invoke("attr", "title")
      .should("contain", "all occurrences of this number");
    underTest.highlightNumber.input
      .get()
      .should("be.enabled")
      .should("have.value", "2");
  });
});

@Component({
  selector: "app-test-wrapper",
  template: `<app-sudoku-solver-settings></app-sudoku-solver-settings>`,
})
class SudokuSolverSettingsWrapperComponent implements OnChanges {
  private store: Store = inject(Store);

  @Input()
  delay = 0;

  @Input()
  grid: Nullable<SudokuGrid>;

  @Input()
  highlight: number | undefined;

  @Input()
  maxSteps = 0;

  @Input()
  pause: number | undefined;

  ngOnChanges(): void {
    this.store.dispatch(SudokuSolverActions.setDelay({ delay: this.delay }));
    this.store.dispatch(
      SudokuSolverActions.setMaximumSteps({ maxSteps: this.maxSteps }),
    );
    this.store.dispatch(
      SudokuSolverActions.setNumberToBeHighlighted({
        highlight: this.highlight,
      }),
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
