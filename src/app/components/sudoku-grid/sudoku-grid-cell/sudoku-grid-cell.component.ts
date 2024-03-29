import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";

@Component({
  selector: "app-sudoku-grid-cell",
  templateUrl: "./sudoku-grid-cell.component.html",
  styleUrls: ["./sudoku-grid-cell.component.scss"],
})
export class SudokuGridCellComponent implements OnChanges {
  value: Nullable<number>;
  values: Nullable<number[]>;
  size = 32;

  @Input({ required: true })
  set cell(cell: SudokuGridCell) {
    this.setCell(cell);
  }

  @Input({ required: true })
  maxValue = 1;

  @Input()
  @HostBinding("class.border-top")
  borderTop = false;

  @Input()
  @HostBinding("class.border-right")
  borderRight = false;

  @Input()
  @HostBinding("class.border-bottom")
  borderBottom = false;

  @Input()
  @HostBinding("class.border-left")
  borderLeft = false;

  @Input()
  @HostBinding("class.duplicate")
  isDuplicate = false;

  @Input()
  @HostBinding("class.highlight")
  highlight = false;

  @Input()
  @HostBinding("class.readonly")
  readonly: Nullable<boolean> = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["maxValue"]) {
      const sqrt = Math.ceil(Math.sqrt(this.maxValue));
      this.size = Math.max(32, 16 + 10 * sqrt);
    }
  }

  private setCell(cell: SudokuGridCell): void {
    if (isArray(cell)) {
      this.values = cell;
      this.value = null;
    } else if (isNotArray(cell)) {
      this.values = null;
      this.value = cell;
    }
  }

  onChange(value: number): void {
    this.valueChange.emit(value);
  }
}
