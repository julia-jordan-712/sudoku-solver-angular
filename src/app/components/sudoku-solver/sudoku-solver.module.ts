import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HintListModule } from "@app/components/general/hint-list/hint-list.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuPuzzleSolverSwitchModule } from "@app/components/sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.module";
import { SudokuSolverActionsModule } from "@app/components/sudoku-solver-actions/sudoku-solver-actions.module";
import { SudokuSolverBranchesModule } from "@app/components/sudoku-solver-branches/sudoku-solver-branches.module";
import { SudokuSolverStatusModule } from "@app/components/sudoku-solver-status/sudoku-solver-status.module";
import { SudokuSolverStepsModule } from "@app/components/sudoku-solver-steps/sudoku-solver-steps.module";
import { SudokuSolverComponent } from "@app/components/sudoku-solver/sudoku-solver.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuSolverComponent],
  imports: [
    CommonModule,
    HintListModule,
    SectionModule,
    SudokuGridModule,
    SudokuPuzzleSolverSwitchModule,
    SudokuSolverActionsModule,
    SudokuSolverBranchesModule,
    SudokuSolverStatusModule,
    SudokuSolverStepsModule,
    TranslateModule,
  ],
  exports: [SudokuSolverComponent],
})
export class SudokuSolverModule {}
