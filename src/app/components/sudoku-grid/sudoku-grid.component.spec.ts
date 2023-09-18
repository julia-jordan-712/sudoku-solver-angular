import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { SudokuGridRowComponent } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row.component";
import { SudokuVerificationModule } from "@app/components/sudoku-verification/sudoku-verification.module";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridCellTestComponent } from "@app/test/components/sudoku-grid-cell-test.component";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { TranslateTestingModule } from "ngx-translate-testing";
import { SudokuGridComponent } from "./sudoku-grid.component";

describe(SudokuGridComponent.name, () => {
  let component: SudokuGridComponent;
  let fixture: ComponentFixture<SudokuGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SudokuGridComponent,
        SudokuGridRowComponent,
        SudokuGridCellTestComponent,
      ],
      imports: [
        ReactiveFormsModule,
        SudokuVerificationModule,
        TranslateTestingModule.withTranslations({}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should display the text from the grid", () => {
    const testGrid: SudokuGrid = [
      [1, 2, 3, 4],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
    ];
    component.grid = testGrid;
    component.verification = VerificationResult.createValid();
    component.duplications = {};
    fixture.detectChanges();

    expect(queryGrid().innerText).toEqual("1\n2\n3\n4");
  });

  it("should set correctly whether a cell is a duplicate", () => {
    const testGrid: SudokuGrid = [
      [1, 2, 3, 1],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
    ];
    component.grid = testGrid;
    component.duplications = { 0: [0, 3] };
    fixture.detectChanges();

    expect(getCellComponent(0).isDuplicate).toEqual(true);
    expect(getCellComponent(1).isDuplicate).toEqual(false);
    expect(getCellComponent(2).isDuplicate).toEqual(false);
    expect(getCellComponent(3).isDuplicate).toEqual(true);
  });

  it("should set correctly whether a cell is the end of a square", () => {
    component.grid = Puzzle4x4.COMPLETE;
    fixture.detectChanges();

    expect(getCellComponent(0).isEndOfSquare).toEqual(false);
    expect(getCellComponent(1).isEndOfSquare).toEqual(true);
    expect(getCellComponent(2).isEndOfSquare).toEqual(false);
    expect(getCellComponent(3).isEndOfSquare).toEqual(true);
  });

  it("should set the allowed maximum value of a cell correctly", () => {
    component.grid = Puzzle4x4.COMPLETE;
    fixture.detectChanges();

    expect(getCellComponent(0).maxValue).toEqual(4);
    expect(getCellComponent(1).maxValue).toEqual(4);
    expect(getCellComponent(2).maxValue).toEqual(4);
    expect(getCellComponent(3).maxValue).toEqual(4);
  });

  it("should emit change when a cell changes", () => {
    const input: SudokuGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [undefined, undefined, 4, 1],
      [undefined, undefined, 2, 3],
    ];
    const changed: SudokuGrid = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [undefined, undefined, 4, 1],
      [4, undefined, 2, 3],
    ];
    component.grid = input;
    fixture.detectChanges();
    const changeSpy = spyOn(component.valueChange, "emit");

    getCellComponent(12).change(4);
    expect(changeSpy).toHaveBeenCalledOnceWith(changed);
  });

  function queryGrid(): any {
    return fixture.nativeElement.querySelector(".grid");
  }

  function getCellComponent(index: number): SudokuGridCellTestComponent {
    return fixture.debugElement.queryAll(By.css("app-sudoku-grid-cell"))[index]
      .componentInstance;
  }
});
