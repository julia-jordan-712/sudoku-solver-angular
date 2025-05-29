import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DevelopmentFunctionsComponent } from "@app/components/development/development-functions/development-functions.component";
import { DevelopmentOpenComponent } from "@app/components/development/development-open/development-open.component";
import { TestSudokusComponent } from "@app/components/development/test-sudokus/test-sudokus.component";
import { CloseButtonModule } from "@app/components/general/close-button/close-button.module";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { RestartModule } from "@app/components/restart/restart.module";
import { SudokuCopyModule } from "@app/components/sudoku-copy/sudoku-copy.module";
import { SudokuPasteModule } from "@app/components/sudoku-paste/sudoku-paste.module";
import { SudokuSolverSettingsModule } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    CloseButtonModule,
    DropdownModule,
    RestartModule,
    SectionModule,
    SudokuCopyModule,
    SudokuPasteModule,
    SudokuSolverSettingsModule,
    TranslateModule,
    DevelopmentFunctionsComponent,
    DevelopmentOpenComponent,
    TestSudokusComponent,
  ],
  exports: [DevelopmentFunctionsComponent, DevelopmentOpenComponent],
})
export class DevelopmentModule {}
