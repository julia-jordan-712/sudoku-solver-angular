import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SudokuGridCellMultipleValuesModule } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-multiple-values/sudoku-grid-cell-multiple-values.module";
import { SudokuGridCellSingleValueModule } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-single-value/sudoku-grid-cell-single-value.module";
import { SudokuGridCellComponent } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.component";

@NgModule({
    imports: [
        CommonModule,
        SudokuGridCellMultipleValuesModule,
        SudokuGridCellSingleValueModule,
        SudokuGridCellComponent,
    ],
    exports: [SudokuGridCellComponent],
})
export class SudokuGridCellModule {}
