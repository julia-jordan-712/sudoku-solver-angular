import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IconModule } from "@app/components/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuVerificationComponent } from "./sudoku-verification.component";

@NgModule({
  declarations: [SudokuVerificationComponent],
  imports: [BrowserAnimationsModule, CommonModule, IconModule, TranslateModule],
  exports: [SudokuVerificationComponent],
})
export class SudokuVerificationModule {}
