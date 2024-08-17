import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
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
    if (changes["selectedItem"]) {
      this._selectedItem = this.selectedItem;
    }
  }

  onChange(option: T): void {
    this._selectedItem = option;
    this.selected.emit(option);
  }

  trackByFn(_: number, item: T): string {
    return item.id;
  }
}

export interface DropdownInputOption extends ObjectWithId {
  name: Observable<string>;
}
