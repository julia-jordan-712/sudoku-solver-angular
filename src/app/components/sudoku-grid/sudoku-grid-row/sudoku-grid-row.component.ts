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
  SudokuGridCellsHighlightResult,
  SudokuGridRowComponentService,
} from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row-component.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
} from "@app/shared/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid-row",
  templateUrl: "./sudoku-grid-row.component.html",
  styleUrls: ["./sudoku-grid-row.component.scss"],
  providers: [SudokuGridRowComponentService],
})
export class SudokuGridRowComponent implements OnChanges {
  _row: Nullable<SudokuGridRowViewModel>;
  sqrt: Nullable<number>;

  private componentService: SudokuGridRowComponentService = inject(
    SudokuGridRowComponentService,
  );

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
    const highlightResult: SudokuGridCellsHighlightResult =
      this.componentService.determineCellsToBeHighlighted(
        changes,
        this._row,
        this.highlightNumber,
      );
    if (highlightResult.updateHighlightedCells) {
      this.highlightCells = highlightResult.newCells;
    }
  }

  onCellChanged(cell: SudokuGridCell, index: number): void {
    const rowChange: SudokuGridCellChangeEvent =
      this.componentService.cellChanged(this._row, cell, index);
    if (rowChange.rowChanged) {
      this.valueChange.emit(rowChange.newRow);
    }
  }

  trackByFn(index_: number, viewModel: SudokuGridCellViewModel): string {
    return viewModel.id;
  }
}
