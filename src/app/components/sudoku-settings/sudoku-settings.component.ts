import { Component, inject } from '@angular/core';
import { SudokuDropdownSelectionItem } from '@app/components/sudoku-settings/services/sudoku-dropdown-selection.service';
import { SudokuSettingsStateService } from '@app/components/sudoku-settings/services/sudoku-settings-state.service';
import { Nullable } from '@app/shared/types/nullable';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sudoku-settings',
  templateUrl: './sudoku-settings.component.html',
  styleUrls: ['./sudoku-settings.component.scss'],
})
export class SudokuSettingsComponent {
  private state = inject(SudokuSettingsStateService);

  confirmed$: Observable<boolean> = this.state.isConfirmed();
  height$: Observable<Nullable<number>> = this.state.getHeight();
  width$: Observable<Nullable<number>> = this.state.getWidth();
  grid$: Observable<Nullable<SudokuGrid>> = this.state.getGrid();
  selectionItems = this.state.getSelectionItems();
  selectedItem$ = this.state.getSelectedItem();

  changeSettings(): void {
    this.state.setConfirmed(false);
  }

  submit(): void {
    this.state.setConfirmed(true);
  }

  onSelect(option: SudokuDropdownSelectionItem): void {
    this.state.setSelection(option);
  }

  onGridChange(grid: SudokuGrid): void {
    this.state.setGrid(grid);
  }

  setWidth(width: number): void {
    this.state.setWidth(width);
  }

  setHeight(height: number): void {
    this.state.setHeight(height);
  }
}
