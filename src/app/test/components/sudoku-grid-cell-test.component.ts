import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCellViewModel } from "@app/shared/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid-cell",
  template: `{{ cell.cell }}`,
})
export class SudokuGridCellTestComponent {
  @Input({ required: true })
  cell: Nullable<SudokuGridCellViewModel>;

  @Input({ required: true })
  maxValue = 1;

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
