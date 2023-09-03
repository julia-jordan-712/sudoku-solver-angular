import { Component, Input } from '@angular/core';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrls: ['./sudoku-grid.component.scss'],
})
export class SudokuGridComponent {
  @Input({ required: true })
  grid: SudokuGrid | undefined;

  trackByFn(index: number): number {
    return index;
  }
}
