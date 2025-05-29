import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { NumberInputModule } from "@app/components/general/number-input/number-input.module";
import { SudokuSolverSettingsComponent } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [CommonModule, IconModule, NumberInputModule, TranslateModule, SudokuSolverSettingsComponent],
    exports: [SudokuSolverSettingsComponent],
})
export class SudokuSolverSettingsModule {}
