import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuSolverStatusComponent } from "@app/components/sudoku-solver/sudoku-solver-status/sudoku-solver-status.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuSolverStatusComponent],
  imports: [CommonModule, TranslateModule],
  exports: [SudokuSolverStatusComponent],
})
export class SudokuSolverStatusModule {}
