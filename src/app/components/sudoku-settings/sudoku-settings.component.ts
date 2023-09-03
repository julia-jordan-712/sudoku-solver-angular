import { Component } from '@angular/core';
import { SudokuSelectionItem } from '@app/components/sudoku-settings/sudoku-selection/sudoku-selection-component.service';
import { SudokuSettingsComponentService } from '@app/components/sudoku-settings/sudoku-settings-component.service';
import { Nullable } from '@app/shared/types/nullable';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sudoku-settings',
  templateUrl: './sudoku-settings.component.html',
  styleUrls: ['./sudoku-settings.component.scss'],
})
export class SudokuSettingsComponent {
  confirmed = false;
  width: Nullable<number>;
  height: Nullable<number>;
  grid$ = new BehaviorSubject<SudokuGrid>([]);

  constructor(private service: SudokuSettingsComponentService) {}

  changeSettings(): void {
    this.confirmed = false;
  }

  submit(): void {
    this.confirmed = true;
  }

  onSelect(option: SudokuSelectionItem): void {
    this.grid$.next(option.grid ?? []);
    this.height = option.grid?.length;
    this.width = option.grid?.[0]?.length;
    this.updateGrid();
  }

  setWidth(value: number): void {
    this.width = value;
    this.updateGrid();
  }

  setHeight(value: number): void {
    this.height = value;
    this.updateGrid();
  }

  private updateGrid(): void {
    this.grid$.next(
      this.service.updateGrid(this.grid$.value, this.width, this.height)
    );
  }
}
