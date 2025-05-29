import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuSolverStatusComponent } from "@app/components/sudoku-solver-status/sudoku-solver-status.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [CommonModule, TranslateModule, SudokuSolverStatusComponent],
    exports: [SudokuSolverStatusComponent],
})
export class SudokuSolverStatusModule {}
