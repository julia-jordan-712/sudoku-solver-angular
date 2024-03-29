import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { SudokuGridRowComponent } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row.component";
import { SudokuVerificationModule } from "@app/components/sudoku-verification/sudoku-verification.module";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModelConverter } from "@app/shared/util/soduku-grid-view-model-converter";
import { SudokuGridCellTestComponent } from "@app/test/components/sudoku-grid-cell-test.component";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { SUDOKU_SOLVER_STATE_MOCK_PROVIDER } from "@app/test/solver/sudoku-solver-state-mock.service";
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
      providers: [SUDOKU_SOLVER_STATE_MOCK_PROVIDER],
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
    component.grid =
      SudokuGridViewModelConverter.createViewModelFromGrid(testGrid);
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
    component.grid =
      SudokuGridViewModelConverter.createViewModelFromGrid(testGrid);
    component.duplications = { 0: [0, 3] };
    fixture.detectChanges();

    expect(getCellComponent(0).isDuplicate).toEqual(true);
    expect(getCellComponent(1).isDuplicate).toEqual(false);
    expect(getCellComponent(2).isDuplicate).toEqual(false);
    expect(getCellComponent(3).isDuplicate).toEqual(true);
  });

  it("should set borders of cells correctly", () => {
    component.grid = SudokuGridViewModelConverter.createViewModelFromGrid(
      Puzzle4x4.COMPLETE,
    );
    fixture.detectChanges();

    // first row
    expect(getCellComponent(0).borderTop).toEqual(true);
    expect(getCellComponent(1).borderTop).toEqual(true);
    expect(getCellComponent(2).borderTop).toEqual(true);
    expect(getCellComponent(3).borderTop).toEqual(true);

    expect(getCellComponent(0).borderRight).toEqual(false);
    expect(getCellComponent(1).borderRight).toEqual(true);
    expect(getCellComponent(2).borderRight).toEqual(false);
    expect(getCellComponent(3).borderRight).toEqual(true);

    expect(getCellComponent(0).borderBottom).toEqual(false);
    expect(getCellComponent(1).borderBottom).toEqual(false);
    expect(getCellComponent(2).borderBottom).toEqual(false);
    expect(getCellComponent(3).borderBottom).toEqual(false);

    expect(getCellComponent(0).borderLeft).toEqual(true);
    expect(getCellComponent(1).borderLeft).toEqual(false);
    expect(getCellComponent(2).borderLeft).toEqual(false);
    expect(getCellComponent(3).borderLeft).toEqual(false);

    // second row
    expect(getCellComponent(4).borderTop).toEqual(false);
    expect(getCellComponent(5).borderTop).toEqual(false);
    expect(getCellComponent(6).borderTop).toEqual(false);
    expect(getCellComponent(7).borderTop).toEqual(false);

    expect(getCellComponent(4).borderRight).toEqual(false);
    expect(getCellComponent(5).borderRight).toEqual(true);
    expect(getCellComponent(6).borderRight).toEqual(false);
    expect(getCellComponent(7).borderRight).toEqual(true);

    expect(getCellComponent(4).borderBottom).toEqual(true);
    expect(getCellComponent(5).borderBottom).toEqual(true);
    expect(getCellComponent(6).borderBottom).toEqual(true);
    expect(getCellComponent(7).borderBottom).toEqual(true);

    expect(getCellComponent(4).borderLeft).toEqual(true);
    expect(getCellComponent(5).borderLeft).toEqual(false);
    expect(getCellComponent(6).borderLeft).toEqual(false);
    expect(getCellComponent(7).borderLeft).toEqual(false);

    // third row
    expect(getCellComponent(8).borderTop).toEqual(false);
    expect(getCellComponent(9).borderTop).toEqual(false);
    expect(getCellComponent(10).borderTop).toEqual(false);
    expect(getCellComponent(11).borderTop).toEqual(false);

    expect(getCellComponent(8).borderRight).toEqual(false);
    expect(getCellComponent(9).borderRight).toEqual(true);
    expect(getCellComponent(10).borderRight).toEqual(false);
    expect(getCellComponent(11).borderRight).toEqual(true);

    expect(getCellComponent(8).borderBottom).toEqual(false);
    expect(getCellComponent(9).borderBottom).toEqual(false);
    expect(getCellComponent(10).borderBottom).toEqual(false);
    expect(getCellComponent(11).borderBottom).toEqual(false);

    expect(getCellComponent(8).borderLeft).toEqual(true);
    expect(getCellComponent(9).borderLeft).toEqual(false);
    expect(getCellComponent(10).borderLeft).toEqual(false);
    expect(getCellComponent(11).borderLeft).toEqual(false);

    // fourth/last row
    expect(getCellComponent(12).borderTop).toEqual(false);
    expect(getCellComponent(13).borderTop).toEqual(false);
    expect(getCellComponent(14).borderTop).toEqual(false);
    expect(getCellComponent(15).borderTop).toEqual(false);

    expect(getCellComponent(12).borderRight).toEqual(false);
    expect(getCellComponent(13).borderRight).toEqual(true);
    expect(getCellComponent(14).borderRight).toEqual(false);
    expect(getCellComponent(15).borderRight).toEqual(true);

    expect(getCellComponent(12).borderBottom).toEqual(true);
    expect(getCellComponent(13).borderBottom).toEqual(true);
    expect(getCellComponent(14).borderBottom).toEqual(true);
    expect(getCellComponent(15).borderBottom).toEqual(true);

    expect(getCellComponent(12).borderLeft).toEqual(true);
    expect(getCellComponent(13).borderLeft).toEqual(false);
    expect(getCellComponent(14).borderLeft).toEqual(false);
    expect(getCellComponent(15).borderLeft).toEqual(false);
  });

  it("should set the allowed maximum value of a cell correctly", () => {
    component.grid = SudokuGridViewModelConverter.createViewModelFromGrid(
      Puzzle4x4.COMPLETE,
    );
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
    component.grid =
      SudokuGridViewModelConverter.createViewModelFromGrid(input);
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
