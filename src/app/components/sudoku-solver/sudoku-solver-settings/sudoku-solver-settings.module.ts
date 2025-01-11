import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/shared/icon/icon.module";
import { NumberInputModule } from "@app/components/shared/number-input/number-input.module";
import { SudokuSolverSettingsComponent } from "@app/components/sudoku-solver/sudoku-solver-settings/sudoku-solver-settings.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuSolverSettingsComponent],
  imports: [CommonModule, IconModule, NumberInputModule, TranslateModule],
  exports: [SudokuSolverSettingsComponent],
})
export class SudokuSolverSettingsModule {}
