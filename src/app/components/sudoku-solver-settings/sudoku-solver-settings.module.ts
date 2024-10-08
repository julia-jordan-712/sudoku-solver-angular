import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuSolverSettingsComponent } from "./sudoku-solver-settings.component";

@NgModule({
  declarations: [SudokuSolverSettingsComponent],
  imports: [CommonModule, IconModule, NumberInputModule, TranslateModule],
  exports: [SudokuSolverSettingsComponent],
})
export class SudokuSolverSettingsModule {}
