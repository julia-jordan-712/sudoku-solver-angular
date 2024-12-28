import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { DropdownInputModule } from "@app/components/interactions/dropdown-input/dropdown-input.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { SelectionListModule } from "@app/components/interactions/selection-list/selection-list.module";
import { SectionModule } from "@app/components/section/section.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuPuzzleComponent],
  imports: [
    CommonModule,
    DropdownInputModule,
    EffectsModule.forFeature([SudokuPuzzleEffects]),
    IconModule,
    NumberInputModule,
    SectionModule,
    SelectionListModule,
    SudokuGridModule,
    TranslateModule,
  ],
  exports: [SudokuPuzzleComponent],
})
export class SudokuPuzzleModule {}
