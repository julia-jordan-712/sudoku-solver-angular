import { Component } from "@angular/core";
import { SudokuSolverSettingsComponent } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.component";
import { SudokuSolverSettingsModule } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.module";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { SudokuSolverStateMockService } from "@app/test/solver/sudoku-solver-state-mock.service";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { CySolverSettings } from "@cypress/views/cy-solver-settings";
import { Observable, of } from "rxjs";

describe(SudokuSolverSettingsComponent.name, () => {
  const underTest: CySolverSettings = new CySolverSettings();

  function setup(grid?: SudokuGrid): void {
    const testState: SudokuSolverTestState = new SudokuSolverTestState(grid);
    cy.mount(
      SudokuSolverSettingsWrapperComponent,
      SudokuSolverSettingsModule,
      {},
      {
        providers: [
          ...SOLVER_TEST_PROVIDERS,
          {
            provide: SUDOKU_SOLVER_STATE,
            useValue: testState,
          },
        ],
      },
    );
  }

  it("should not display anything if there is no sudoku", () => {
    setup();
    underTest.delay.get().should("not.exist");
    underTest.maxSteps.get().should("not.exist");
    underTest.pauseAtStep.get().should("not.exist");
    underTest.highlightNumber.get().should("not.exist");
    underTest.copySudoku.get().should("not.exist");
  });

  it("should display an input field for the delay", () => {
    setup(Puzzle4x4.COMPLETE);
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
    setup(Puzzle4x4.COMPLETE);
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
    setup(Puzzle4x4.COMPLETE);
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
    setup(Puzzle4x4.COMPLETE);
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
class SudokuSolverSettingsWrapperComponent {}

export class SudokuSolverTestState extends SudokuSolverStateMockService {
  constructor(private grid: Nullable<SudokuGrid>) {
    super();
  }

  override getCurrentBranch(): Observable<Nullable<SudokuGridViewModel>> {
    return of(
      this.grid
        ? SudokuGridViewModelConverter.createViewModelFromGrid(
            SudokuGridUtil.clone(this.grid),
            "test-id",
            {
              branchInfo: { id: "test-id", isCurrent: true },
              verificationResult: null,
              highlightChangedCells: false,
            },
          )
        : null,
    );
  }
  override getDelay(): Observable<number> {
    return of(100);
  }
  override getMaximumSteps(): Observable<number> {
    return of(10_000);
  }
  override getPauseAfterStep(): Observable<Nullable<number>> {
    return of(7);
  }
  override getHighlightNumber(): Observable<Nullable<number>> {
    return of(2);
  }
}
