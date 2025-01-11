import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {
  SudokuGridComponentService,
  SudokuGridRowChangeEvent,
} from "@app/components/sudoku-grid/sudoku-grid-component.service";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid, SudokuGridRow } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid",
  templateUrl: "./sudoku-grid.component.html",
  styleUrls: ["./sudoku-grid.component.scss"],
  providers: [SudokuGridComponentService],
})
export class SudokuGridComponent {
  protected _grid: Nullable<SudokuGridViewModel>;
  protected sqrt: Nullable<number>;

  private componentService: SudokuGridComponentService = inject(
    SudokuGridComponentService,
  );

  @Input({ required: true })
  set grid(grid: Nullable<SudokuGridViewModel>) {
    this._grid = grid;
    this.sqrt = grid ? Math.round(Math.sqrt(grid.rows.length)) : null;
  }

  @Input()
  highlightNumber: Nullable<number>;
  @Input()
  readonly: Nullable<boolean>;

  @Input()
  showVerification = true;

  @Output()
  valueChange: EventEmitter<SudokuGrid> = new EventEmitter();

  @Output()
  valueSubmit: EventEmitter<SudokuGrid> = new EventEmitter();

  protected onRowChanged(row: SudokuGridRow, index: number): void {
    const rowChange: SudokuGridRowChangeEvent =
      this.componentService.rowChanged(this._grid, row, index);
    if (rowChange.gridChanged) {
      this.valueChange.emit(rowChange.newGrid);
    }
  }

  protected onRowSubmitted(row: SudokuGridRow, index: number): void {
    const rowChange: SudokuGridRowChangeEvent =
      this.componentService.rowChanged(this._grid, row, index);
    if (rowChange.gridChanged) {
      this.valueSubmit.emit(rowChange.newGrid);
    }
  }
}
