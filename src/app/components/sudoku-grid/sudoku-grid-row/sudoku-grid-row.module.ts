import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuGridCellModule } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.module";
import { SudokuGridRowComponent } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row.component";

@NgModule({
  declarations: [SudokuGridRowComponent],
  imports: [CommonModule, SudokuGridCellModule],
  exports: [SudokuGridRowComponent],
})
export class SudokuGridRowModule {}
