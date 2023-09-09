import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
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

  @HostBinding("class.focused")
  isFocused = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  onChange(value: number): void {
    this.valueChange.emit(value);
  }

  setFocus(focused: boolean): void {
    this.isFocused = focused;
  }

}
