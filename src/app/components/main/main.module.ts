import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DevelopmentModule } from "@app/components/development/development.module";
import { HelpModule } from "@app/components/help/help.module";
import { LanguageSelectionModule } from "@app/components/language-selection/language-selection.module";
import { MainComponent } from "@app/components/main/main.component";
import { SudokuPuzzleModule } from "@app/components/sudoku-puzzle/sudoku-puzzle.module";
import { SudokuSolverModule } from "@app/components/sudoku-solver/sudoku-solver.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        DevelopmentModule,
        HelpModule,
        LanguageSelectionModule,
        SudokuPuzzleModule,
        SudokuSolverModule,
        TranslateModule,
        MainComponent,
    ],
    exports: [MainComponent],
})
export class MainModule {}
