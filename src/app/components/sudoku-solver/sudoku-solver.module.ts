import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/input-field/number-input/number-input.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuSolverActionsComponent } from "./sudoku-solver-actions/sudoku-solver-actions.component";
import { SudokuSolverComponent } from "./sudoku-solver.component";

@NgModule({
  declarations: [SudokuSolverComponent, SudokuSolverActionsComponent],
  imports: [
    CommonModule,
    IconModule,
    NumberInputModule,
    SudokuGridModule,
    TranslateModule,
  ],
  exports: [SudokuSolverComponent],
})
export class SudokuSolverModule {}
