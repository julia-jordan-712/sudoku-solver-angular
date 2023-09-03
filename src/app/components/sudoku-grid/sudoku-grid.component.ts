import { Component, Input } from '@angular/core';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrls: ['./sudoku-grid.component.scss'],
})
export class SudokuGridComponent {
  _grid: SudokuGrid | undefined;
  sqrt: number|undefined;

  @Input({ required: true })
  set grid(grid: SudokuGrid) {
    this._grid = grid;
    this.sqrt = Math.sqrt(grid.length);
  }

  trackByFn(index: number): number {
    return index;
  }
}
