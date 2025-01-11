import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DevelopmentComponent } from "@app/components/development/development.component";
import { TestSudokusComponent } from "@app/components/development/test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { RestartModule } from "@app/components/restart/restart.module";
import { SudokuCopyModule } from "@app/components/sudoku-copy/sudoku-copy.module";
import { SudokuPasteModule } from "@app/components/sudoku-paste/sudoku-paste.module";
import { SudokuSolverSettingsModule } from "@app/components/sudoku-solver-settings/sudoku-solver-settings.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DevelopmentComponent, TestSudokusComponent],
  imports: [
    CommonModule,
    DropdownModule,
    IconModule,
    RestartModule,
    SectionModule,
    SudokuCopyModule,
    SudokuPasteModule,
    SudokuSolverSettingsModule,
    TranslateModule,
  ],
  exports: [DevelopmentComponent],
})
export class DevelopmentModule {}
