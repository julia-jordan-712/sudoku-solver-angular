import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SudokuCopyComponent } from "@app/components/sudoku-copy/sudoku-copy.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuCopyComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [SudokuCopyComponent],
})
export class SudokuCopyModule {}
