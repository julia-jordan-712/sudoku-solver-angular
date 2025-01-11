import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SelectionListModule } from "@app/components/interactions/selection-list/selection-list.module";
import { DropdownModule } from "@app/components/shared/dropdown/dropdown.module";
import { IconModule } from "@app/components/shared/icon/icon.module";
import { NumberInputModule } from "@app/components/shared/number-input/number-input.module";
import { SectionModule } from "@app/components/shared/section/section.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuPuzzleSolverSwitchModule } from "@app/components/sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.module";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
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
    TranslateModule,
  ],
  exports: [SudokuPuzzleComponent],
})
export class SudokuPuzzleModule {}
