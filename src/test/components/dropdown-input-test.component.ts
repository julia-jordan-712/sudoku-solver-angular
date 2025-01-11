import { Component } from "@angular/core";
import { DropdownInputComponent } from "@app/components/shared/dropdown-input/dropdown-input.component";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";

@Component({
  selector: "app-dropdown-input",
  template: `{{ selectedItem.name }}
    {{ selectedItem.name$ | async }}
    {{ selectedItem.i18nKey?.key | translate: selectedItem.i18nKey?.params }}`,
})
export class DropdownInputTestComponent extends DropdownInputComponent<SudokuDropdownSelectionItem> {}
