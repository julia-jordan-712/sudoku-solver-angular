import { Component, Input } from '@angular/core';
import { Nullable } from '@app/shared/types/nullable';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrls: ['./sudoku-grid.component.scss'],
})
export class SudokuGridComponent {
  _grid: Nullable<SudokuGrid>;
  sqrt: Nullable<number>;

  @Input({ required: true })
  set grid(grid: Nullable<SudokuGrid>) {
    this._grid = grid;
    this.sqrt = grid ? Math.sqrt(grid.length) : null;
  }

  trackByFn(index: number): number {
    return index;
  }
}
