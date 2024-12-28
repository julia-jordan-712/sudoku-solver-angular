import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DevFunctionsModule } from "@app/components/dev-functions/dev-functions.module";
import { SudokuPuzzleModule } from "@app/components/sudoku-puzzle/sudoku-puzzle.module";
import { SudokuSolverModule } from "@app/components/sudoku-solver/sudoku-solver.module";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageSelectionModule } from "./../language-selection/language-selection.module";
import { MainComponent } from "./main.component";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    DevFunctionsModule,
    LanguageSelectionModule,
    SudokuPuzzleModule,
    SudokuSolverModule,
    TranslateModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
