import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {
  SudokuGridComponentService,
  SudokuGridRowChangeEvent,
} from "@app/components/sudoku-grid/sudoku-grid-component.service";
import { DuplicationColumnIndicesToRowIndices } from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid",
  templateUrl: "./sudoku-grid.component.html",
  styleUrls: ["./sudoku-grid.component.scss"],
  providers: [SudokuGridComponentService],
})
export class SudokuGridComponent {
  _grid: Nullable<SudokuGridViewModel>;
  sqrt: Nullable<number>;
  gridColumns = "";

  private componentService: SudokuGridComponentService = inject(
    SudokuGridComponentService,
  );

  @Input({ required: true })
  set grid(grid: Nullable<SudokuGridViewModel>) {
    this._grid = grid;
    this.sqrt = grid ? Math.round(Math.sqrt(grid.rows.length)) : null;
    this.gridColumns = `repeat(${grid?.rows?.length ?? 1}, max-content)`;
  }

  @Input()
  verification: Nullable<VerificationResult>;
  @Input()
  duplications: Nullable<DuplicationColumnIndicesToRowIndices>;
  @Input()
  highlightNumber: Nullable<number>;
  @Input()
  readonly: Nullable<boolean>;

  @Output()
  valueChange: EventEmitter<SudokuGrid> = new EventEmitter();

  onRowChanged(row: SudokuGridRow, index: number): void {
    const rowChange: SudokuGridRowChangeEvent =
      this.componentService.rowChanged(this._grid, row, index);
    if (rowChange.gridChanged) {
      this.valueChange.emit(rowChange.newGrid);
    }
  }
}
