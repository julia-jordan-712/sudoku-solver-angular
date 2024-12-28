import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { SectionModule } from "@app/components/section/section.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { SudokuSolverActionsModule } from "@app/components/sudoku-solver/sudoku-solver-actions/sudoku-solver-actions.module";
import { SudokuSolverBranchesModule } from "@app/components/sudoku-solver/sudoku-solver-branches/sudoku-solver-branches.module";
import { SudokuSolverSettingsModule } from "@app/components/sudoku-solver/sudoku-solver-settings/sudoku-solver-settings.module";
import { SudokuSolverStatusModule } from "@app/components/sudoku-solver/sudoku-solver-status/sudoku-solver-status.module";
import { SudokuSolverStepsModule } from "@app/components/sudoku-solver/sudoku-solver-steps/sudoku-solver-steps.module";
import { SudokuSolverComponent } from "@app/components/sudoku-solver/sudoku-solver.component";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuSolverComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([SudokuSolverEffects]),
    IconModule,
    NumberInputModule,
    SectionModule,
    SudokuGridModule,
    SudokuSolverActionsModule,
    SudokuSolverBranchesModule,
    SudokuSolverSettingsModule,
    SudokuSolverStatusModule,
    SudokuSolverStepsModule,
    TranslateModule,
  ],
  exports: [SudokuSolverComponent],
})
export class SudokuSolverModule {}
