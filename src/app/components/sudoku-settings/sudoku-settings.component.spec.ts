import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SudokuSettingsComponent } from './sudoku-settings.component';

describe(SudokuSettingsComponent.name, () => {
  let component: SudokuSettingsComponent;
  let fixture: ComponentFixture<SudokuSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
