import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { SudokuGridCellComponentService } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-component.service";
import { SudokuGridCellMultipleValuesComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-multiple-values/sudoku-grid-cell-multiple-values.component";
import { SudokuGridCellSingleValueComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-single-value/sudoku-grid-cell-single-value.component";
import { CellPosition } from "@app/shared/types/cell-position";
import { SudokuGridCellViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridCellComponent } from "./sudoku-grid-cell.component";

describe(SudokuGridCellComponent.name, () => {
  let component: SudokuGridCellComponent;
  let fixture: ComponentFixture<SudokuGridCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SudokuGridCellComponent,
        SudokuGridCellSingleValueComponent,
        SudokuGridCellMultipleValuesComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [SudokuGridCellComponentService],
    });
    fixture = TestBed.createComponent(SudokuGridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should emit the input value from the child component", () => {
    component.cell = new SudokuGridCellViewModel(
      "id-0",
      5,
      new CellPosition(0, 0),
      9,
      20,
      { id: "test-id", isCurrent: true },
      null,
    );
    fixture.detectChanges();
    const valueChangeSpy = spyOn(component.valueChange, "emit").and.callFake(
      () => {},
    );

    setInput(7);
    expect(valueChangeSpy).toHaveBeenCalledWith(7);
  });

  function getInput(): any {
    return fixture.nativeElement.querySelector("input");
  }

  function setInput(value: number): void {
    const inputElement = getInput();
    inputElement.dispatchEvent(new Event("focus"));
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("input"));
    inputElement.dispatchEvent(new Event("blur"));
  }
});
