import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import { isNotArray } from "@app/shared/util/is-array";

@Component({
  selector: "app-sudoku-grid-row",
  templateUrl: "./sudoku-grid-row.component.html",
  styleUrls: ["./sudoku-grid-row.component.scss"],
})
export class SudokuGridRowComponent implements OnChanges {
  _row: Nullable<SudokuGridRow>;
  sqrt: Nullable<number>;

  @Input({ required: true })
  set row(row: Nullable<SudokuGridRow>) {
    this._row = row;
    this.sqrt = row ? Math.round(Math.sqrt(row.length)) : null;
  }

  @Input()
  borderTop = false;

  @Input()
  borderBottom = false;

  @Input()
  columnsWithDuplicates: Nullable<number[]>;

  @Input()
  highlightNumber: Nullable<number>;
  highlightCells: boolean[] = [];

  @Input()
  readonly: Nullable<boolean>;

  @Output()
  valueChange: EventEmitter<SudokuGridRow> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["row"] || changes["highlightNumber"]) {
      if (this._row && this.highlightNumber) {
        this.highlightCells = this._row.map(
          (cell) => isNotArray(cell) && this.highlightNumber === cell,
        );
      } else {
        this.highlightCells = [];
      }
    }
  }

  onCellChanged(cell: SudokuGridCell, index: number): void {
    if (this._row && index >= 0 && index < this._row.length) {
      const newRow = [...this._row];
      newRow[index] = cell;
      this.valueChange.emit(newRow);
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
