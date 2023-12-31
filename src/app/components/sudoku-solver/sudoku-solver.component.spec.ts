import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/input-field/number-input/number-input.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { SudokuSolverStatusComponent } from "@app/components/sudoku-solver/sudoku-solver-status/sudoku-solver-status.component";
import { SudokuSolverStepsComponent } from "@app/components/sudoku-solver/sudoku-solver-steps/sudoku-solver-steps.component";
import { SudokuSolverComponent } from "@app/components/sudoku-solver/sudoku-solver.component";
import { SolverResponse } from "@app/core/solver/solver-response";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { PuzzleSimple } from "@app/test/puzzles/puzzle-simple";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { TranslateTestingModule } from "ngx-translate-testing";
import { of } from "rxjs";
import { SudokuSolverActionsComponent } from "./sudoku-solver-actions/sudoku-solver-actions.component";

describe(SudokuSolverComponent.name, () => {
  let fixture: ComponentFixture<SudokuSolverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SudokuSolverComponent,
        SudokuSolverActionsComponent,
        SudokuSolverStatusComponent,
        SudokuSolverStepsComponent,
      ],
      imports: [
        IconModule,
        NumberInputModule,
        TranslateTestingModule.withTranslations({}),
        SudokuGridModule,
      ],
      providers: [
        ...SOLVER_TEST_PROVIDERS,
        SudokuSolverStateService,
        { provide: SUDOKU_SOLVER_STATE, useExisting: SudokuSolverStateService },
      ],
    });
    spyOn(TestBed.inject(SUDOKU_SOLVER_STATE), "getBranches").and.returnValue(
      of([PuzzleSimple.PUZZLE_3.puzzle]),
    );
    spyOn(TestBed.inject(SudokuSolverService), "solveNextStep").and.callFake(
      (b) => {
        return {
          branches: b,
          status: "INCOMPLETE",
          stepId: "TEST",
        } satisfies SolverResponse;
      },
    );
    fixture = TestBed.createComponent(SudokuSolverComponent);
    fixture.detectChanges();
  });

  it("should allow to start initially", () => {
    expect(getStart().disabled).toEqual(false);
    expect(getPause().disabled).toEqual(true);
    expect(getNext().disabled).toEqual(false);

    expect(getStates().innerText).toContain("SOLVER.STATUS.NOT_STARTED");
  });

  it("should allow to pause but not to go to next step while running", () => {
    getStart().click();
    fixture.detectChanges();

    expect(getStart().disabled).toEqual(true);
    expect(getPause().disabled).toEqual(false);
    expect(getNext().disabled).toEqual(true);

    expect(getStates().innerText).toContain("SOLVER.STATUS.RUNNING");
  });

  it("should allow to continue and to go to next step while paused", () => {
    getStart().click();
    fixture.detectChanges();
    getPause().click();
    fixture.detectChanges();

    expect(getStart().disabled).toEqual(false);
    expect(getPause().disabled).toEqual(true);
    expect(getNext().disabled).toEqual(false);

    expect(getStates().innerText).toContain("SOLVER.STATUS.PAUSED");
  });

  it("should allow to continue and to go to next step after going to next step", () => {
    getNext().click();
    fixture.detectChanges();

    expect(getStart().disabled).toEqual(false);
    expect(getPause().disabled).toEqual(true);
    expect(getNext().disabled).toEqual(false);

    expect(getStates().innerText).toContain("SOLVER.STATUS.PAUSED");
  });

  it("should allow to pause again but not to go to next step after continuing", () => {
    getStart().click();
    fixture.detectChanges();
    getPause().click();
    fixture.detectChanges();
    getStart().click();
    fixture.detectChanges();

    expect(getStart().disabled).toEqual(true);
    expect(getPause().disabled).toEqual(false);
    expect(getNext().disabled).toEqual(true);

    expect(getStates().innerText).toContain("SOLVER.STATUS.RUNNING");
  });

  it("should show amount of executed steps and what the last step was", () => {
    expect(getSteps().innerText).toContain("0");
    expect(getSteps().innerText).not.toContain("SOLVER.STEPS.LAST");

    getNext().click();
    fixture.detectChanges();

    expect(getSteps().innerText).toContain("1");
    expect(getSteps().innerText).toContain("SOLVER.STEPS.LAST");
    expect(getSteps().innerText).toContain("SOLVER.STEPS.STEP.TEST");
  });

  function getStart(): any {
    return fixture.nativeElement.querySelector("#start");
  }

  function getPause(): any {
    return fixture.nativeElement.querySelector("#pause");
  }

  function getNext(): any {
    return fixture.nativeElement.querySelector("#next");
  }

  function getStates(): any {
    return fixture.nativeElement.querySelector("app-sudoku-solver-status");
  }

  function getSteps(): any {
    return fixture.nativeElement.querySelector("app-sudoku-solver-steps");
  }
});
