import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClearStateComponent } from "@app/components/dev-functions/clear-state/clear-state.component";
import { CopySudokuComponent } from "@app/components/dev-functions/copy-sudoku/copy-sudoku.component";
import { DevFunctionsComponent } from "@app/components/dev-functions/dev-functions.component";
import { PasteSudokuComponent } from "@app/components/dev-functions/paste-sudoku/paste-sudoku.component";
import { TestSudokusComponent } from "@app/components/dev-functions/test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CopySudokuComponent,
    ClearStateComponent,
    DevFunctionsComponent,
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
  exports: [DevFunctionsComponent],
})
export class DevFunctionsModule {}
