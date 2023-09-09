import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DuplicationColumnIndicesToRowIndices } from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

@Component({
  selector: "app-sudoku-grid",
  templateUrl: "./sudoku-grid.component.html",
  styleUrls: ["./sudoku-grid.component.scss"],
})
export class SudokuGridComponent {
  _grid: Nullable<SudokuGrid>;
  sqrt: Nullable<number>;

  @Input({ required: true })
  set grid(grid: Nullable<SudokuGrid>) {
    this._grid = grid;
    this.sqrt = grid ? Math.round(Math.sqrt(grid.length)) : null;
  }

  @Input()
  verification: Nullable<VerificationResult>;
  @Input()
  duplications: Nullable<DuplicationColumnIndicesToRowIndices>;

  @Output()
  valueChange: EventEmitter<SudokuGrid> = new EventEmitter();

  onRowChanged(row: SudokuGridRow, index: number): void {
    if (this._grid && index >= 0 && index < this._grid.length) {
      const newGrid = SudokuGridUtil.clone(this._grid);
      newGrid[index] = row;
      this.valueChange.emit(newGrid);
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
