import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SudokuGridCell } from "@app/types/sudoku-grid";
import { SudokuGridCellViewModel } from "@app/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid-cell",
  template: `{{ _cell }}`,
})
export class SudokuGridCellTestComponent {
  size: number | undefined;
  maxValue: number | undefined;
  _cell: SudokuGridCell | undefined;
  isDuplicate = false;

  @Input({ required: true })
  set cell(cell: SudokuGridCellViewModel) {
    this._cell = cell.cell;
    this.maxValue = cell.data.maxValue;
    this.size = cell.data.widthAndHeight;
    this.isDuplicate = cell.isDuplicate();
  }

  @Input()
  borderTop = false;

  @Input()
  borderRight = false;

  @Input()
  borderBottom = false;

  @Input()
  borderLeft = false;

  @Input()
  highlight = false;

  @Input()
  readonly = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  change(value: number): void {
    this.valueChange.emit(value);
  }
}
