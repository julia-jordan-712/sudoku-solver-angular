import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DropdownInputOption } from "@app/components/interactions/dropdown-input/dropdown-input-option";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-dropdown-input",
  templateUrl: "./dropdown-input.component.html",
  styleUrls: ["./dropdown-input.component.scss"],
})
export class DropdownInputComponent<T> implements OnChanges {
  private readonly NO_SELECTION_ITEM: DropdownInputOption<any> = {
    id: "DROPDOWN_NO_SELECTION",
    name: "-",
  };

  @Input()
  label: Nullable<string>;

  @Input({ required: true })
  selectedItem: Nullable<DropdownInputOption<T>>;

  @Input({ required: true })
  items: DropdownInputOption<T>[];

  @Output()
  selected: EventEmitter<Nullable<DropdownInputOption<T>>> = new EventEmitter();

  protected _items: DropdownInputOption<T>[];
  protected _selectedItem: Nullable<DropdownInputOption<T>>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["items"]) {
      this._items = [this.NO_SELECTION_ITEM, ...this.items];
    }
    if (changes["selectedItem"] || changes["items"]) {
      this._selectedItem =
        this.findItemById(this.selectedItem?.id) ?? this.NO_SELECTION_ITEM;
    }
  }

  private findItemById(id: Nullable<string>): Nullable<DropdownInputOption<T>> {
    return this._items.find((item) => item.id === id);
  }

  onChange(option: DropdownInputOption<T>): void {
    if (option.id === this.NO_SELECTION_ITEM.id) {
      this.selected.emit(null);
    } else {
      this.selected.emit(option);
    }
  }
}
