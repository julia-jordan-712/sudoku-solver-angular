import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SudokuGridCellComponent } from "./sudoku-grid-cell/sudoku-grid-cell.component";
import { SudokuGridRowComponent } from "./sudoku-grid-row/sudoku-grid-row.component";
import { SudokuGridComponent } from "./sudoku-grid.component";
import { SudokuVerificationModule } from "@app/components/sudoku-verification/sudoku-verification.module";
import { SudokuGridCellSingleValueComponent } from "./sudoku-grid-cell/sudoku-grid-cell-single-value/sudoku-grid-cell-single-value.component";
import { SudokuGridCellMultipleValuesComponent } from "./sudoku-grid-cell/sudoku-grid-cell-multiple-values/sudoku-grid-cell-multiple-values.component";

@NgModule({
  declarations: [
    SudokuGridComponent,
    SudokuGridCellComponent,
    SudokuGridRowComponent,
    SudokuGridCellSingleValueComponent,
    SudokuGridCellMultipleValuesComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SudokuVerificationModule],
  exports: [SudokuGridComponent],
})
export class SudokuGridModule {}
