import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SudokuGridRowComponent } from "./sudoku-grid-row.component";

describe(SudokuGridRowComponent.name, () => {
  let component: SudokuGridRowComponent;
  let fixture: ComponentFixture<SudokuGridRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuGridRowComponent],
    });
    fixture = TestBed.createComponent(SudokuGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
