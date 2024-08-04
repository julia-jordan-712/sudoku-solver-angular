import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SudokuGridCellSingleValueComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-single-value/sudoku-grid-cell-single-value.component";

@NgModule({
  declarations: [SudokuGridCellSingleValueComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SudokuGridCellSingleValueComponent],
})
export class SudokuGridCellSingleValueModule {}
