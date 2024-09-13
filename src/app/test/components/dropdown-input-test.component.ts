import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-dropdown-input",
  template: `{{ selectedItem.name }}
    {{ selectedItem.name$ | async }}
    {{ selectedItem.i18nKey?.key | translate: selectedItem.i18nKey?.params }}`,
})
export class DropdownInputTestComponent {
  @Input()
  label: Nullable<string>;

  @Input({ required: true })
  selectedItem: Nullable<SudokuDropdownSelectionItem>;

  @Input({ required: true })
  items: Nullable<SudokuDropdownSelectionItem[]>;

  @Output()
  selected: EventEmitter<SudokuDropdownSelectionItem> = new EventEmitter();

  change(option: SudokuDropdownSelectionItem): void {
    this.selected.emit(option);
  }
}
