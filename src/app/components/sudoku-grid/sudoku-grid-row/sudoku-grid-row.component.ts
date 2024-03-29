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
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
} from "@app/shared/types/sudoku-grid-view-model";
import { isNotArray } from "@app/shared/util/is-array";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";

@Component({
  selector: "app-sudoku-grid-row",
  templateUrl: "./sudoku-grid-row.component.html",
  styleUrls: ["./sudoku-grid-row.component.scss"],
})
export class SudokuGridRowComponent implements OnChanges {
  _row: Nullable<SudokuGridRowViewModel>;
  sqrt: Nullable<number>;

  @Input({ required: true })
  set row(row: Nullable<SudokuGridRowViewModel>) {
    this._row = row;
    this.sqrt = row ? Math.round(Math.sqrt(row.cells.length)) : null;
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
        this.highlightCells = this._row.cells.map(
          (cell) => isNotArray(cell) && this.highlightNumber === cell.cell,
        );
      } else {
        this.highlightCells = [];
      }
    }
  }

  onCellChanged(cell: SudokuGridCell, index: number): void {
    if (this._row && index >= 0 && index < this._row.cells.length) {
      const newRow = [
        ...SudokuGridViewModelConverter.createRowFromViewModel(this._row),
      ];
      newRow[index] = cell;
      this.valueChange.emit(newRow);
    }
  }

  trackByFn(index_: number, viewModel: SudokuGridCellViewModel): string {
    return viewModel.id;
  }
}
