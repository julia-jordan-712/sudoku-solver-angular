import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuSolverBranchesComponent } from "@app/components/sudoku-solver/sudoku-solver-branches/sudoku-solver-branches.component";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuSolverActionsComponent } from "./sudoku-solver-actions/sudoku-solver-actions.component";
import { SudokuSolverStatusComponent } from "./sudoku-solver-status/sudoku-solver-status.component";
import { SudokuSolverStepsComponent } from "./sudoku-solver-steps/sudoku-solver-steps.component";
import { SudokuSolverComponent } from "./sudoku-solver.component";

@NgModule({
  declarations: [
    SudokuSolverComponent,
    SudokuSolverActionsComponent,
    SudokuSolverBranchesComponent,
    SudokuSolverStatusComponent,
    SudokuSolverStepsComponent,
  ],
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
