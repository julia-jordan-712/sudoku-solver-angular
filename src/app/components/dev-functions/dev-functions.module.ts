import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClearStateComponent } from "@app/components/dev-functions/clear-state/clear-state.component";
import { CopySudokuComponent } from "@app/components/dev-functions/copy-sudoku/copy-sudoku.component";
import { DevFunctionsComponent } from "@app/components/dev-functions/dev-functions.component";
import { PasteSudokuComponent } from "@app/components/dev-functions/paste-sudoku/paste-sudoku.component";
import { IconModule } from "@app/components/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CopySudokuComponent,
    ClearStateComponent,
    DevFunctionsComponent,
    PasteSudokuComponent,
  ],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [DevFunctionsComponent],
})
export class DevFunctionsModule {}
