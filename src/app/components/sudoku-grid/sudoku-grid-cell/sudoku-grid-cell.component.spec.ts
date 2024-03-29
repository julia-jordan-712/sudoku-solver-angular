import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { SudokuGridCellMultipleValuesComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-multiple-values/sudoku-grid-cell-multiple-values.component";
import { SudokuGridCellSingleValueComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-single-value/sudoku-grid-cell-single-value.component";
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
    });
    fixture = TestBed.createComponent(SudokuGridCellComponent);
    component = fixture.componentInstance;
    component.maxValue = 9;
    component.ngOnChanges({ maxValue: { currentValue: 9 } as SimpleChange });
    fixture.detectChanges();
  });

  it("should emit the input value from the child component", () => {
    component.cell = { id: "id-0", cell: 5 };
    component.ngOnChanges({ cell: { currentValue: 5 } as SimpleChange });
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
