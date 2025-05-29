import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuGridCellMultipleValuesComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-multiple-values/sudoku-grid-cell-multiple-values.component";

@NgModule({
    imports: [CommonModule, SudokuGridCellMultipleValuesComponent],
    exports: [SudokuGridCellMultipleValuesComponent],
})
export class SudokuGridCellMultipleValuesModule {}
