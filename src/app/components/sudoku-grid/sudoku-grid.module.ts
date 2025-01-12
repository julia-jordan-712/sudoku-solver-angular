import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuGridRowModule } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row.module";
import { SudokuGridComponent } from "@app/components/sudoku-grid/sudoku-grid.component";

@NgModule({
  declarations: [SudokuGridComponent],
  imports: [CommonModule, SudokuGridRowModule],
  exports: [SudokuGridComponent],
})
export class SudokuGridModule {}
