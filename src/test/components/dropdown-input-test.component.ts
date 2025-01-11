import { Component } from "@angular/core";
import { DropdownComponent } from "@app/components/shared/dropdown/dropdown.component";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";

@Component({
  selector: "app-dropdown",
  template: `{{ selectedItem.name }}
    {{ selectedItem.name$ | async }}
    {{ selectedItem.i18nKey?.key | translate: selectedItem.i18nKey?.params }}`,
})
export class DropdownInputTestComponent extends DropdownComponent<SudokuDropdownSelectionItem> {}
