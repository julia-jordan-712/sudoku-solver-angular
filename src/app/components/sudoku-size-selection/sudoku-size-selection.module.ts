import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SelectionListModule } from "@app/components/general/selection-list/selection-list.module";
import { SudokuSizeSelectionComponent } from "@app/components/sudoku-size-selection/sudoku-size-selection.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    SelectionListModule,
    TranslateModule,
    SudokuSizeSelectionComponent,
  ],
  exports: [SudokuSizeSelectionComponent],
})
export class SudokuSizeSelectionModule {}
