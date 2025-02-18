import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SudokuSolverActionsComponent } from "@app/components/sudoku-solver-actions/sudoku-solver-actions.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuSolverActionsComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [SudokuSolverActionsComponent],
})
export class SudokuSolverActionsModule {}
