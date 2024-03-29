import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { SudokuGridCellViewModel } from "@app/shared/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid-cell",
  template: `{{ _cell }}`,
})
export class SudokuGridCellTestComponent {
  size: number | undefined;
  maxValue: number | undefined;
  _cell: SudokuGridCell | undefined;

  @Input({ required: true })
  set cell(cell: SudokuGridCellViewModel) {
    this._cell = cell.cell;
    this.maxValue = cell.maxValue;
    this.size = cell.widthAndHeight;
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
  isDuplicate = false;

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
