import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuSolverComponent } from "./sudoku-solver.component";

@NgModule({
  declarations: [SudokuSolverComponent],
  imports: [CommonModule, SudokuGridModule, TranslateModule],
  exports: [SudokuSolverComponent],
})
export class SudokuSolverModule {}
