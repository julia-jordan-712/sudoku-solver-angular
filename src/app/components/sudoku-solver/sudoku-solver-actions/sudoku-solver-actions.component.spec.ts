import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/input-field/number-input/number-input.module";
import { SudokuSolverService } from "@app/core/solver/sudoku-solver.service";
import { TranslateTestingModule } from "ngx-translate-testing";
import { SudokuSolverActionsComponent } from "./sudoku-solver-actions.component";

describe(SudokuSolverActionsComponent.name, () => {
  let fixture: ComponentFixture<SudokuSolverActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuSolverActionsComponent],
      imports: [
        IconModule,
        NumberInputModule,
        TranslateTestingModule.withTranslations({}),
      ],
    });
    fixture = TestBed.createComponent(SudokuSolverActionsComponent);
    fixture.detectChanges();
    spyOn(TestBed.inject(SudokuSolverService), "solveNextStep").and.callFake(
      (b) => b,
    );
  });

  it("should allow to start initially", () => {
    expect(getStart().disabled).toEqual(false);
    expect(getPause().disabled).toEqual(true);
    expect(getNext().disabled).toEqual(true);

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
    getStart().click();
    fixture.detectChanges();
    getPause().click();
    fixture.detectChanges();
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
    return fixture.nativeElement.querySelector(".states");
  }
});
