import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AnimationsModule } from "@app/animations/animations.module";
import { SudokuSolverStepsComponent } from "@app/components/sudoku-solver-steps/sudoku-solver-steps.component";
import { TranslateI18nKeyModule } from "@app/pipes/translate-i18n-key/translate-i18n-key.module";
import { SudokuSolverLastStepDescriptionComponent } from "./sudoku-solver-last-step-description/sudoku-solver-last-step-description.component";

@NgModule({
    imports: [AnimationsModule, CommonModule, TranslateI18nKeyModule, SudokuSolverStepsComponent,
        SudokuSolverLastStepDescriptionComponent],
    exports: [SudokuSolverStepsComponent],
})
export class SudokuSolverStepsModule {}
