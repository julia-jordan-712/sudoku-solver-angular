import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { SudokuSolverActionsComponent } from "@app/components/sudoku-solver/sudoku-solver-actions/sudoku-solver-actions.component";
import { SudokuSolverBranchesComponent } from "@app/components/sudoku-solver/sudoku-solver-branches/sudoku-solver-branches.component";
import { SudokuSolverStatusComponent } from "@app/components/sudoku-solver/sudoku-solver-status/sudoku-solver-status.component";
import { SudokuSolverStepsComponent } from "@app/components/sudoku-solver/sudoku-solver-steps/sudoku-solver-steps.component";
import { SudokuSolverComponent } from "@app/components/sudoku-solver/sudoku-solver.component";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";

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
    EffectsModule.forFeature([SudokuSolverEffects]),
    IconModule,
    NumberInputModule,
    SudokuGridModule,
    TranslateModule,
  ],
  exports: [SudokuSolverComponent],
})
export class SudokuSolverModule {}
