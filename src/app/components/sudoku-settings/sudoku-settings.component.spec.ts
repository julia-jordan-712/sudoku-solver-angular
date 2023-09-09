import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SudokuSettingsComponent } from "./sudoku-settings.component";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(SudokuSettingsComponent.name, () => {
  let component: SudokuSettingsComponent;
  let fixture: ComponentFixture<SudokuSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuSettingsComponent],
      imports: [TranslateTestingModule.withTranslations({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
