import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuSolverStepsComponent } from "@app/components/sudoku-solver/sudoku-solver-steps/sudoku-solver-steps.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuSolverStepsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [SudokuSolverStepsComponent],
})
export class SudokuSolverStepsModule {}
