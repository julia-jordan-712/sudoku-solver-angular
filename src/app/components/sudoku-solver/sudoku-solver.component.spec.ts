import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateTestingModule } from "ngx-translate-testing";
import { SudokuSolverComponent } from "./sudoku-solver.component";

describe(SudokuSolverComponent.name, () => {
  let component: SudokuSolverComponent;
  let fixture: ComponentFixture<SudokuSolverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuSolverComponent],
      imports: [TranslateTestingModule.withTranslations({})],
    });
    fixture = TestBed.createComponent(SudokuSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
