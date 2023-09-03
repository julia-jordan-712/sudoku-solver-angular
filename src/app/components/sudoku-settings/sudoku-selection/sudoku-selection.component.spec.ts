import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SudokuSelectionComponent } from './sudoku-selection.component';

describe(SudokuSelectionComponent.name, () => {
  let component: SudokuSelectionComponent;
  let fixture: ComponentFixture<SudokuSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuSelectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
