import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-settings/services/sudoku-dropdown-selection.service";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-dropdown-input",
  template: `{{ selectedItem.name | async }}`,
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
