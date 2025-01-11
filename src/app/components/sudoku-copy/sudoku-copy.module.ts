import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuCopyComponent } from "./sudoku-copy.component";

@NgModule({
  declarations: [SudokuCopyComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [SudokuCopyComponent],
})
export class SudokuCopyModule {}
