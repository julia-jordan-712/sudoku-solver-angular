import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { SudokuGridCellComponent } from "./sudoku-grid-cell.component";

describe(SudokuGridCellComponent.name, () => {
  let component: SudokuGridCellComponent;
  let fixture: ComponentFixture<SudokuGridCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuGridCellComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SudokuGridCellComponent);
    component = fixture.componentInstance;
    component.maxValue = 9;
    component.ngOnInit();
    component.ngOnChanges({ maxValue: { currentValue: 9 } as SimpleChange });
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it("should set the input field value to the component input", () => {
    component.cell = 4;
    component.ngOnChanges({ cell: { currentValue: 4 } as SimpleChange });
    fixture.detectChanges();

    expect(component.inputField.value).toEqual(4);
    expect(component.inputField.errors).toBeNull();
  });

  it("should have errors if the input is invalid", () => {
    component.cell = 12;
    component.ngOnChanges({ cell: { currentValue: 12 } as SimpleChange });
    fixture.detectChanges();

    expect(component.inputField.value).toEqual(12);
    expect(component.inputField.errors).not.toBeNull();
  });

  it("should change host class when focus/blur occur", () => {
    expect(getInput()).not.toBeNull();
    expect(fixture.nativeElement.classList.contains("focused")).toBeFalse();

    getInput().dispatchEvent(new MouseEvent("focus"));
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains("focused")).toBeTrue();

    getInput().dispatchEvent(new MouseEvent("blur"));
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains("focused")).toBeFalse();
  });

  it("should emit the input value if change is valid", () => {
    component.cell = 5;
    component.ngOnChanges({ cell: { currentValue: 5 } as SimpleChange });
    fixture.detectChanges();
    const valueChangeSpy = spyOn(component.valueChange, "emit").and.callFake(
      () => {},
    );

    setInput(7);

    expect(component.inputField.value).toEqual(7);
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).toHaveBeenCalledWith(7);
  });

  it("should reset to the input value if change is invalid", async () => {
    component.cell = 5;
    component.ngOnChanges({ cell: { currentValue: 5 } as SimpleChange });
    fixture.detectChanges();
    const valueChangeSpy = spyOn(component.valueChange, "emit").and.callFake(
      () => {},
    );

    setInput(12);

    expect(component.inputField.value).toEqual(5);
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).not.toHaveBeenCalled();
  });

  it("should reset to the input value if cell is readonly", () => {
    component.cell = 3;
    component.readonly = true;
    component.ngOnChanges({ cell: { currentValue: 3 } as SimpleChange });
    fixture.detectChanges();
    const valueChangeSpy = spyOn(component.valueChange, "emit").and.callFake(
      () => {},
    );

    setInput(1);

    expect(component.inputField.value).toEqual(3);
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).not.toHaveBeenCalled();
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
