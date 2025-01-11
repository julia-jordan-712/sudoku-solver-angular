import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClearStateComponent } from "@app/components/development-functions/clear-state/clear-state.component";
import { DevelopmentFunctionsComponent } from "@app/components/development-functions/development-functions.component";
import { PasteSudokuComponent } from "@app/components/development-functions/paste-sudoku/paste-sudoku.component";
import { TestSudokusComponent } from "@app/components/development-functions/test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { SudokuCopyModule } from "@app/components/sudoku-copy/sudoku-copy.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ClearStateComponent,
    DevelopmentFunctionsComponent,
    PasteSudokuComponent,
    TestSudokusComponent,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    IconModule,
    SectionModule,
    SudokuCopyModule,
    TranslateModule,
  ],
  exports: [DevelopmentFunctionsComponent],
})
export class DevelopmentFunctionsModule {}
