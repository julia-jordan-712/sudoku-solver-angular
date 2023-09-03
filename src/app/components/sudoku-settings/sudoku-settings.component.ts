import { Component } from '@angular/core';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';

@Component({
  selector: 'app-sudoku-settings',
  templateUrl: './sudoku-settings.component.html',
  styleUrls: ['./sudoku-settings.component.scss'],
})
export class SudokuSettingsComponent {
  grid: SudokuGrid = [];
}
