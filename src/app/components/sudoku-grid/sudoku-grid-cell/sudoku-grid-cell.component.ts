import { Component, HostBinding, Input } from '@angular/core';
import { SudokuGridCell } from '@app/shared/types/sudoku-grid';

@Component({
  selector: 'app-sudoku-grid-cell',
  templateUrl: './sudoku-grid-cell.component.html',
  styleUrls: ['./sudoku-grid-cell.component.scss']
})
export class SudokuGridCellComponent {
  @Input({ required: true })
  cell: SudokuGridCell;

  @Input()
  @HostBinding("class.end-of-square")
  isEndOfSquare = false;

}
