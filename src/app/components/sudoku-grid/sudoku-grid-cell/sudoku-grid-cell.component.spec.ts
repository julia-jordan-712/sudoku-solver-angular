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
    component.ngOnChanges();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it("should set the input field value to the component input", () => {
    component.cell = 4;
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.inputField.value).toEqual(4);
    expect(component.inputField.errors).toBeNull();
  });

  it("should have errors if the input is invalid", () => {
    component.cell = 12;
    component.ngOnChanges();
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

  it("should reset to the input value if change is invalid", () => {
    component.cell = 5;
    component.ngOnChanges();
    fixture.detectChanges();

    component.inputField.setValue(7);
    expect(component.inputField.value).toEqual(7);
    expect(component.inputField.errors).toBeNull();

    component.inputField.setValue(12);
    expect(component.inputField.value).toEqual(5);
    expect(component.inputField.errors).toBeNull();
  });

  function getInput(): any {
    return fixture.nativeElement.querySelector("input");
  }
});
