import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DuplicationColumnIndicesToRowIndices } from "@app/components/sudoku-settings/services/sudoku-settings-state.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";

@Component({
  selector: "app-sudoku-grid",
  template: ``,
})
export class SudokuGridTestComponent {
  @Input({ required: true })
  grid: Nullable<SudokuGridViewModel>;

  @Input()
  verification: Nullable<VerificationResult>;

  @Input()
  duplications: Nullable<DuplicationColumnIndicesToRowIndices>;

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
