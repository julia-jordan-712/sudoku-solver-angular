import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  SudokuGridCellChangeEvent,
  SudokuGridRowComponentService,
} from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row-component.service";
import { Nullable } from "@app/types/nullable";
import { SudokuGridCell, SudokuGridRow } from "@app/types/sudoku-grid";
import { SudokuGridRowViewModel } from "@app/types/sudoku-grid-view-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-sudoku-grid-row",
  templateUrl: "./sudoku-grid-row.component.html",
  styleUrls: ["./sudoku-grid-row.component.scss"],
  providers: [SudokuGridRowComponentService],
})
export class SudokuGridRowComponent implements OnChanges {
  private componentService: SudokuGridRowComponentService = inject(
    SudokuGridRowComponentService,
  );

  row$: Observable<SudokuGridRowViewModel> = this.componentService.getRow();
  highlightCells$: Observable<boolean[]> =
    this.componentService.getHighlightCells();
  sqrt: Nullable<number>;

  @Input({ required: true })
  set row(row: Nullable<SudokuGridRowViewModel>) {
    this.componentService.setRow(row);
    this.sqrt = row ? Math.round(Math.sqrt(row.cells.length)) : null;
  }

  @Input()
  borderTop = false;

  @Input()
  borderBottom = false;

  @Input()
  set highlightNumber(highlightNumber: Nullable<number>) {
    this.componentService.setHighlightNumber(highlightNumber);
  }

  @Input()
  readonly: Nullable<boolean>;

  @Output()
  valueChange: EventEmitter<SudokuGridRow> = new EventEmitter();

  @Output()
  valueSubmit: EventEmitter<SudokuGridRow> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.componentService.onChanges(changes);
  }

  onCellChanged(cell: SudokuGridCell, index: number): void {
    const rowChange: SudokuGridCellChangeEvent =
      this.componentService.cellChanged(cell, index);
    if (rowChange.rowChanged) {
      this.valueChange.emit(rowChange.newRow);
    }
  }

  onCellSubmitted(cell: SudokuGridCell, index: number): void {
    const rowChange: SudokuGridCellChangeEvent =
      this.componentService.cellChanged(cell, index);
    if (rowChange.rowChanged) {
      this.valueSubmit.emit(rowChange.newRow);
    }
  }
}
