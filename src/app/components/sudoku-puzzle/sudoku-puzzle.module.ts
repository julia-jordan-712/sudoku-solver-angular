import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { IconModule } from "@app/components/general/icon/icon.module";
import { NumberInputModule } from "@app/components/general/number-input/number-input.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { SelectionListModule } from "@app/components/general/selection-list/selection-list.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuPuzzleSolverSwitchModule } from "@app/components/sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.module";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
import { SudokuVerificationModule } from "@app/components/sudoku-verification/sudoku-verification.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuPuzzleComponent],
  imports: [
    CommonModule,
    DropdownModule,
    IconModule,
    NumberInputModule,
    SectionModule,
    SelectionListModule,
    SudokuGridModule,
    SudokuPuzzleSolverSwitchModule,
    SudokuVerificationModule,
    TranslateModule,
  ],
  exports: [SudokuPuzzleComponent],
})
export class SudokuPuzzleModule {}
