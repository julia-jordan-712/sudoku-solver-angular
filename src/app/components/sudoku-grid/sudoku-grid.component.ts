import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DuplicationColumnIndicesToRowIndices } from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import {
  SudokuGridRowViewModel,
  SudokuGridViewModel,
} from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";

@Component({
  selector: "app-sudoku-grid",
  templateUrl: "./sudoku-grid.component.html",
  styleUrls: ["./sudoku-grid.component.scss"],
})
export class SudokuGridComponent {
  _grid: Nullable<SudokuGridViewModel>;
  sqrt: Nullable<number>;
  gridColumns = "";

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
    if (this._grid && index >= 0 && index < this._grid.rows.length) {
      const newGrid = SudokuGridUtil.clone(
        SudokuGridViewModelConverter.createGridFromViewModel(this._grid),
      );
      newGrid[index] = row;
      this.valueChange.emit(newGrid);
    }
  }

  trackByFn(index_: number, viewModel: SudokuGridRowViewModel): string {
    return viewModel.id;
  }
}
