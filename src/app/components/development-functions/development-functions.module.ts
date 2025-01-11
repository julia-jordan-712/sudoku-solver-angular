import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DevelopmentFunctionsComponent } from "@app/components/development-functions/development-functions.component";
import { TestSudokusComponent } from "@app/components/development-functions/test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { RestartModule } from "@app/components/restart/restart.module";
import { SudokuCopyModule } from "@app/components/sudoku-copy/sudoku-copy.module";
import { SudokuPasteModule } from "@app/components/sudoku-paste/sudoku-paste.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DevelopmentFunctionsComponent, TestSudokusComponent],
  imports: [
    CommonModule,
    DropdownModule,
    IconModule,
    RestartModule,
    SectionModule,
    SudokuCopyModule,
    SudokuPasteModule,
    TranslateModule,
  ],
  exports: [DevelopmentFunctionsComponent],
})
export class DevelopmentFunctionsModule {}
