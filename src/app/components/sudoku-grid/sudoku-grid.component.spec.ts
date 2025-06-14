import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SudokuGridCellComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.component";
import { SudokuGridComponentService } from "@app/components/sudoku-grid/sudoku-grid-component.service";
import { SudokuGridRowComponent } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row.component";
import { SudokuGridComponent } from "@app/components/sudoku-grid/sudoku-grid.component";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";
import { SudokuGridViewModelConverter } from "@app/util/sudoku-grid-view-model-converter";
import { SudokuGridCellTestComponent } from "@test/components/sudoku-grid-cell-test.component";
import { Puzzle4x4 } from "@test/puzzles/puzzle-4x4";
import { SudokuGridViewModelMock } from "@test/sudoku/sudoku-grid-view-model.mock";
import { v4 as randomUUID } from "uuid";

describe(SudokuGridComponent.name, () => {
  let component: SudokuGridComponent;
  let fixture: ComponentFixture<SudokuGridComponent>;

  function setUp(grid: SudokuGridViewModel): void {
    TestBed.configureTestingModule({
      imports: [SudokuGridComponent],
      providers: [SudokuGridComponentService],
    })
      .overrideComponent(SudokuGridRowComponent, {
        remove: { imports: [SudokuGridCellComponent] },
        add: { imports: [SudokuGridCellTestComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SudokuGridComponent);
    component = fixture.componentInstance;
    component.grid = grid;
    fixture.detectChanges();
  }

  it("should set borders of cells correctly", () => {
    setUp(
      SudokuGridViewModelConverter.createViewModelFromGrid(
        Puzzle4x4.COMPLETE,
        randomUUID(),
        SudokuGridViewModelMock.DATA,
      ),
    );

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
    setUp(
      SudokuGridViewModelConverter.createViewModelFromGrid(
        Puzzle4x4.COMPLETE,
        randomUUID(),
        SudokuGridViewModelMock.DATA,
      ),
    );

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
    setUp(
      SudokuGridViewModelConverter.createViewModelFromGrid(
        input,
        randomUUID(),
        SudokuGridViewModelMock.DATA,
      ),
    );
    const changeSpy = spyOn(component.valueChange, "emit");

    getCellComponent(12).change(4);
    expect(changeSpy).toHaveBeenCalledOnceWith(changed);
  });

  function getCellComponent(index: number): SudokuGridCellTestComponent {
    return fixture.debugElement.queryAll(By.css("app-sudoku-grid-cell"))[index]
      .componentInstance;
  }
});
