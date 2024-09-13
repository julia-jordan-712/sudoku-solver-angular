import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { DropdownInputModule } from "@app/components/interactions/dropdown-input/dropdown-input.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { SelectionListModule } from "@app/components/interactions/selection-list/selection-list.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuPuzzleComponent } from "./sudoku-puzzle.component";

@NgModule({
  declarations: [SudokuPuzzleComponent],
  imports: [
    CommonModule,
    DropdownInputModule,
    IconModule,
    NumberInputModule,
    SelectionListModule,
    SudokuGridModule,
    TranslateModule,
    EffectsModule.forFeature([SudokuPuzzleEffects]),
  ],
  exports: [SudokuPuzzleComponent],
})
export class SudokuPuzzleModule {}
