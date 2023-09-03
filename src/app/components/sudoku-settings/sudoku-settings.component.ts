import { Component } from '@angular/core';
import { SudokuSelectionItem } from '@app/components/sudoku-settings/sudoku-selection/sudoku-selection.service';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-sudoku-settings',
  templateUrl: './sudoku-settings.component.html',
  styleUrls: ['./sudoku-settings.component.scss'],
})
export class SudokuSettingsComponent {
  confirmed = false;
  grid$: Subject<SudokuGrid> = new BehaviorSubject([] as SudokuGrid);

  changeSettings(): void {
    this.confirmed = false;
  }

  submit(): void {
    this.confirmed = true;
  }

  onSelect(option: SudokuSelectionItem): void {
    this.grid$.next(option.grid)
  }
}
