import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuSolverBranchesComponent } from "@app/components/sudoku-solver-branches/sudoku-solver-branches.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [CommonModule, TranslateModule, SudokuSolverBranchesComponent],
    exports: [SudokuSolverBranchesComponent],
})
export class SudokuSolverBranchesModule {}
