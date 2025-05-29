import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuGridRowModule } from "@app/components/sudoku-grid/sudoku-grid-row/sudoku-grid-row.module";
import { SudokuGridComponent } from "@app/components/sudoku-grid/sudoku-grid.component";
import { SudokuVerificationModule } from "@app/components/sudoku-verification/sudoku-verification.module";

@NgModule({
    imports: [CommonModule, SudokuGridRowModule, SudokuVerificationModule, SudokuGridComponent],
    exports: [SudokuGridComponent],
})
export class SudokuGridModule {}
