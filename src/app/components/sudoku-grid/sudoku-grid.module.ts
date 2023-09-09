import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SudokuGridCellComponent } from './sudoku-grid-cell/sudoku-grid-cell.component';
import { SudokuGridRowComponent } from './sudoku-grid-row/sudoku-grid-row.component';
import { SudokuGridComponent } from './sudoku-grid.component';

@NgModule({
  declarations: [SudokuGridComponent, SudokuGridCellComponent, SudokuGridRowComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SudokuGridComponent],
})
export class SudokuGridModule {}
