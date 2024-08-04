import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { DropdownInputModule } from "@app/components/interactions/dropdown-input/dropdown-input.module";
import { NumberInputModule } from "@app/components/interactions/number-input/number-input.module";
import { SelectionListModule } from "@app/components/interactions/selection-list/selection-list.module";
import { SudokuGridModule } from "@app/components/sudoku-grid/sudoku-grid.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuSettingsComponent } from "./sudoku-settings.component";

@NgModule({
  declarations: [SudokuSettingsComponent],
  imports: [
    CommonModule,
    DropdownInputModule,
    IconModule,
    NumberInputModule,
    SelectionListModule,
    SudokuGridModule,
    TranslateModule,
  ],
  exports: [SudokuSettingsComponent],
})
export class SudokuSettingsModule {}
