import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { SudokuCopyModule } from "@app/components/sudoku-copy/sudoku-copy.module";
import { TranslateModule } from "@ngx-translate/core";
import { ClearStateComponent } from "./clear-state/clear-state.component";
import { DevelopmentFunctionsComponent } from "./development-functions.component";
import { PasteSudokuComponent } from "./paste-sudoku/paste-sudoku.component";
import { TestSudokusComponent } from "./test-sudokus/test-sudokus.component";

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
