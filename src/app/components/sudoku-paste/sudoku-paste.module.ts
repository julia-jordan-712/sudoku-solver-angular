import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SudokuPasteComponent } from "@app/components/sudoku-paste/sudoku-paste.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuPasteComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [SudokuPasteComponent],
})
export class SudokuPasteModule {}
