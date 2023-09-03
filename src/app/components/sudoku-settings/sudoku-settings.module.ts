import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuSettingsComponent } from './sudoku-settings.component';
import { NumberInputModule } from '@app/components/input-field/number-input/number-input.module';
import { SudokuSelectionComponent } from './sudoku-selection/sudoku-selection.component';
import { DropdownInputModule } from '@app/components/input-field/dropdown-input/dropdown-input.module';
import { SudokuGridModule } from '@app/components/sudoku-grid/sudoku-grid.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SudokuSettingsComponent, SudokuSelectionComponent],
  imports: [CommonModule, DropdownInputModule, NumberInputModule, SudokuGridModule, TranslateModule],
  exports: [SudokuSettingsComponent],
})
export class SudokuSettingsModule {}
