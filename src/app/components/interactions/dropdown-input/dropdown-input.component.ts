import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { I18nKey } from "@app/shared/types/i18n-key";
import { Nullable } from "@app/shared/types/nullable";
import { ObjectWithId } from "@app/shared/types/object-with-id";
import { Observable } from "rxjs";

@Component({
  selector: "app-dropdown-input",
  templateUrl: "./dropdown-input.component.html",
  styleUrls: ["./dropdown-input.component.scss"],
})
export class DropdownInputComponent<T extends DropdownInputOption>
  implements OnChanges
{
  @Input()
  label: Nullable<string>;

  @Input({ required: true })
  selectedItem: Nullable<T>;

  @Input({ required: true })
  items: Nullable<T[]>;

  @Output()
  selected: EventEmitter<T> = new EventEmitter();

  protected _selectedItem: Nullable<T>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selectedItem"] || changes["items"]) {
      const selectedItem = this.selectedItem;
      if (selectedItem) {
        this._selectedItem = this.items?.filter(
          (item) => item.id === selectedItem.id,
        )?.[0];
      } else {
        this._selectedItem = null;
      }
    }
  }

  onChange(option: T): void {
    this.selected.emit(option);
  }
}

export interface DropdownInputOption extends ObjectWithId {
  name?: string;
  name$?: Observable<string>;
  i18nKey?: I18nKey;
}
