import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NumberInputModule } from "@app/components/input-field/number-input/number-input.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuSolverSettingsComponent } from "./sudoku-solver-settings.component";

@NgModule({
  declarations: [SudokuSolverSettingsComponent],
  imports: [CommonModule, NumberInputModule, TranslateModule],
  exports: [SudokuSolverSettingsComponent],
})
export class SudokuSolverSettingsModule {}
