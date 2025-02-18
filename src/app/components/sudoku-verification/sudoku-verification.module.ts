import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AnimationsModule } from "@app/animations/animations.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SudokuVerificationComponent } from "@app/components/sudoku-verification/sudoku-verification.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuVerificationComponent],
  imports: [AnimationsModule, CommonModule, IconModule, TranslateModule],
  exports: [SudokuVerificationComponent],
})
export class SudokuVerificationModule {}
