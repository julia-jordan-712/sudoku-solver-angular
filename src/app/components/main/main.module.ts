import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuSettingsModule } from "@app/components/sudoku-settings/sudoku-settings.module";
import { SudokuSolverModule } from "@app/components/sudoku-solver/sudoku-solver.module";
import { TranslateModule } from "@ngx-translate/core";
import { MainComponent } from "./main.component";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SudokuSettingsModule,
    SudokuSolverModule,
    TranslateModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
