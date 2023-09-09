import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SudokuVerificationComponent } from "./sudoku-verification.component";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(SudokuVerificationComponent.name, () => {
  let component: SudokuVerificationComponent;
  let fixture: ComponentFixture<SudokuVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SudokuVerificationComponent],
      imports: [TranslateTestingModule.withTranslations({})],
    });
    fixture = TestBed.createComponent(SudokuVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
