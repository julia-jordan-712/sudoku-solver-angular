import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconModule } from "@app/components/icon/icon.module";
import { SudokuSolverActionsComponent } from "./sudoku-solver-actions.component";

describe(SudokuSolverActionsComponent.name, () => {
  let fixture: ComponentFixture<SudokuSolverActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuSolverActionsComponent],
      imports: [IconModule],
    });
    fixture = TestBed.createComponent(SudokuSolverActionsComponent);
    fixture.detectChanges();
  });

  it("should allow to start initially", () => {
    expect(getStart().disabled).toEqual(false);
    expect(getPause().disabled).toEqual(true);
    expect(getNext().disabled).toEqual(true);
  });

  it("should allow to pause but not to go to next step while running", () => {
    getStart().click();
    fixture.detectChanges();

    expect(getStart().disabled).toEqual(true);
    expect(getPause().disabled).toEqual(false);
    expect(getNext().disabled).toEqual(true);
  });

  it("should allow to continue and to go to next step while paused", () => {
    getStart().click();
    fixture.detectChanges();
    getPause().click();
    fixture.detectChanges();

    expect(getStart().disabled).toEqual(false);
    expect(getPause().disabled).toEqual(true);
    expect(getNext().disabled).toEqual(false);
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
});
