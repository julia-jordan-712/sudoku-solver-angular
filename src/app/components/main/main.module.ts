import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { SudokuPuzzleModule } from "@app/components/sudoku-puzzle/sudoku-puzzle.module";
import { SudokuSolverSettingsModule } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.module";
import { SudokuSolverModule } from "@app/components/sudoku-solver/sudoku-solver.module";
import { TranslateModule } from "@ngx-translate/core";
import { MainComponent } from "./main.component";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    IconModule,
    SudokuPuzzleModule,
    SudokuSolverModule,
    SudokuSolverSettingsModule,
    TranslateModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
