import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClearStateComponent } from "./clear-state/clear-state.component";
import { CopySudokuComponent } from "./copy-sudoku/copy-sudoku.component";
import { DevelopmentFunctionsComponent } from "./development-functions.component";
import { PasteSudokuComponent } from "./paste-sudoku/paste-sudoku.component";
import { TestSudokusComponent } from "./test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CopySudokuComponent,
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
    TranslateModule,
  ],
  exports: [DevelopmentFunctionsComponent],
})
export class DevelopmentFunctionsModule {}
