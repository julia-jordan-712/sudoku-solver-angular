import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuGridComponent } from './sudoku-grid.component';
import { SudokuGridCellComponent } from './sudoku-grid-cell/sudoku-grid-cell.component';
import { SudokuGridRowComponent } from './sudoku-grid-row/sudoku-grid-row.component';

@NgModule({
  declarations: [SudokuGridComponent, SudokuGridCellComponent, SudokuGridRowComponent],
  imports: [CommonModule],
  exports: [SudokuGridComponent],
})
export class SudokuGridModule {}
