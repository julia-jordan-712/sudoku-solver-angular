import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";

@Component({
  selector: "app-sudoku-grid-cell",
  template: `{{ cell }}`,
})
export class SudokuGridCellTestComponent {
  @Input({ required: true })
  cell: SudokuGridCell;

  @Input({ required: true })
  maxValue = 1;

  @Input()
  isEndOfSquare = false;

  @Input()
  isDuplicate = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  change(value: number): void {
    this.valueChange.emit(value);
  }
}
