import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownInputModule } from '@app/components/input-field/dropdown-input/dropdown-input.module';
import { NumberInputModule } from '@app/components/input-field/number-input/number-input.module';
import { SudokuGridModule } from '@app/components/sudoku-grid/sudoku-grid.module';
import { TranslateModule } from '@ngx-translate/core';
import { SudokuSettingsComponent } from './sudoku-settings.component';

@NgModule({
  declarations: [SudokuSettingsComponent],
  imports: [CommonModule, DropdownInputModule, NumberInputModule, SudokuGridModule, TranslateModule],
  exports: [SudokuSettingsComponent],
})
export class SudokuSettingsModule {}
