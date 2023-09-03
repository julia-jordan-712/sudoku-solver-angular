import { Component, HostBinding, Input } from '@angular/core';
import { Nullable } from '@app/shared/types/nullable';
import { SudokuGridRow } from '@app/shared/types/sudoku-grid';

@Component({
  selector: 'app-sudoku-grid-row',
  templateUrl: './sudoku-grid-row.component.html',
  styleUrls: ['./sudoku-grid-row.component.scss'],
})
export class SudokuGridRowComponent {
  @Input({ required: true })
  row: SudokuGridRow = [];

  @Input()
  sqrt: Nullable<number>;

  @Input()
  @HostBinding('class.end-of-square')
  isEndOfSquare = false;

  trackByFn(index: number): number {
    return index;
  }
}
