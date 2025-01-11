import { SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { SudokuGridCellSingleValueComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-single-value/sudoku-grid-cell-single-value.component";

describe(SudokuGridCellSingleValueComponent.name, () => {
  let component: SudokuGridCellSingleValueComponent;
  let fixture: ComponentFixture<SudokuGridCellSingleValueComponent>;
  let valueChangeSpy: jasmine.Spy;
  let valueSubmitSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuGridCellSingleValueComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SudokuGridCellSingleValueComponent);
    component = fixture.componentInstance;
    component.maxValue = 9;
    component.ngOnInit();
    component.ngOnChanges({ maxValue: new SimpleChange(undefined, 9, true) });
    fixture.detectChanges();

    valueChangeSpy = spyOn(component.valueChange, "emit").and.callFake(
      () => {},
    );
    valueSubmitSpy = spyOn(component.valueSubmit, "emit").and.callFake(
      () => {},
    );
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it("should set the input field value to the component input", () => {
    setInitialComponentValue(4);

    expect(component.inputField.value).toEqual(4);
    expect(component.inputField.errors).toBeNull();
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

  it("should have errors if the input value is invalid", () => {
    setInitialComponentValue(12);

    expect(component.inputField.value).toEqual(12);
    expect(component.inputField.errors).not.toBeNull();
    expect(component.inputField.valid).toEqual(false);
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(valueSubmitSpy).not.toHaveBeenCalled();
  });

  it("should have NO errors if the input value is valid", () => {
    setInitialComponentValue(7);

    expect(component.inputField.value).toEqual(7);
    expect(component.inputField.errors).toBeNull();
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(valueSubmitSpy).not.toHaveBeenCalled();
  });

  it("should emit the new value and have errors if the new value is invalid", () => {
    setInitialComponentValue(1);

    setInput(12);

    expect(component.inputField.value).toEqual(12);
    expect(component.inputField.errors).not.toBeNull();
    expect(component.inputField.valid).toEqual(false);
    expect(valueChangeSpy).toHaveBeenCalledWith(12);
    expect(valueSubmitSpy).not.toHaveBeenCalled();
  });

  it("should emit the new value and have NO errors if the new value is valid", () => {
    setInitialComponentValue(1);

    setInput(5);

    expect(component.inputField.value).toEqual(5);
    expect(component.inputField.errors).toBeNull();
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).toHaveBeenCalledWith(5);
    expect(valueSubmitSpy).not.toHaveBeenCalled();
  });

  it("should emit the new value on blur if change is valid", () => {
    setInitialComponentValue(5);

    setInput(7, true);

    expect(component.inputField.value).toEqual(7);
    expect(component.inputField.valid).toEqual(true);
    expect(component.inputField.errors).toBeNull();
    expect(valueChangeSpy).toHaveBeenCalledWith(7);
    expect(valueSubmitSpy).toHaveBeenCalledWith(7);
  });

  it("should reset to the input value on blur if change is invalid", async () => {
    setInitialComponentValue(5);

    setInput(12, true);

    expect(component.inputField.value).toEqual(5);
    expect(component.inputField.valid).toEqual(true);
    expect(component.inputField.errors).toBeNull();
    expect(valueChangeSpy).toHaveBeenCalledWith(12);
    expect(valueSubmitSpy).toHaveBeenCalledWith(5);
  });

  it("should reset to the input value on change if cell is readonly", () => {
    component.readonly = true;
    setInitialComponentValue(3);

    setInput(1);

    expect(component.inputField.value).toEqual(3);
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(valueSubmitSpy).not.toHaveBeenCalledWith(5);
  });

  it("should reset to the input value on blur if cell is readonly", () => {
    component.readonly = true;
    setInitialComponentValue(3);

    setInput(1, true);

    expect(component.inputField.value).toEqual(3);
    expect(component.inputField.valid).toEqual(true);
    expect(valueChangeSpy).not.toHaveBeenCalled();
    expect(valueSubmitSpy).not.toHaveBeenCalledWith(5);
  });

  function getInput(): any {
    return fixture.nativeElement.querySelector("input");
  }

  function setInput(value: number, blur = false): void {
    const inputElement = getInput();
    inputElement.dispatchEvent(new Event("focus"));
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("input"));
    if (blur) {
      inputElement.dispatchEvent(new Event("blur"));
    }
  }

  function setInitialComponentValue(value: number): void {
    component.value = value;
    component.ngOnChanges({ value: new SimpleChange(undefined, value, true) });
    fixture.detectChanges();
  }
});
