import { Component, EventEmitter, Input, Output } from "@angular/core";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid",
  template: ``,
})
export class SudokuGridTestComponent {
  _grid: Nullable<SudokuGridViewModel>;
  verification: Nullable<VerificationResult>;

  @Input({ required: true })
  set grid(grid: Nullable<SudokuGridViewModel>) {
    this._grid = grid;
    this.verification = grid?.data.verificationResult;
  }

  @Output()
  valueChange: EventEmitter<SudokuGrid> = new EventEmitter();

  @Output()
  valueSubmit: EventEmitter<SudokuGrid> = new EventEmitter();

  change(grid: SudokuGrid): void {
    this.valueChange.emit(grid);
  }

  submit(grid: SudokuGrid): void {
    this.valueSubmit.emit(grid);
  }
}
