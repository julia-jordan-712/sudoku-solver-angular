import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SudokuVerificationComponent } from "./sudoku-verification.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuVerificationComponent],
  imports: [CommonModule, TranslateModule],
  exports: [SudokuVerificationComponent],
})
export class SudokuVerificationModule {}
