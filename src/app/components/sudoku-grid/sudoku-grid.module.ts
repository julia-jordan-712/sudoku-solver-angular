import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuGridComponent } from './sudoku-grid.component';
import { SudokuGridCellComponent } from './sudoku-grid-cell/sudoku-grid-cell.component';
import { SudokuGridRowComponent } from './sudoku-grid-row/sudoku-grid-row.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SudokuGridComponent, SudokuGridCellComponent, SudokuGridRowComponent],
  imports: [CommonModule, FormsModule],
  exports: [SudokuGridComponent],
})
export class SudokuGridModule {}
