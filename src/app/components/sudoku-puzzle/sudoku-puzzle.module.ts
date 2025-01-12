import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SectionModule } from "@app/components/general/section/section.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuPuzzleSolverSwitchModule } from "@app/components/sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.module";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
import { SudokuSizeSelectionModule } from "@app/components/sudoku-size-selection/sudoku-size-selection.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuPuzzleComponent],
  imports: [
    CommonModule,
    SectionModule,
    SudokuGridModule,
    SudokuPuzzleSolverSwitchModule,
    SudokuSizeSelectionModule,
    TranslateModule,
  ],
  exports: [SudokuPuzzleComponent],
})
export class SudokuPuzzleModule {}
