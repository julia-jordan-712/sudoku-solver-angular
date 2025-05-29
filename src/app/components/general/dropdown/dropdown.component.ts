import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Nullable } from "@app/types/nullable";
import { SingleSelectionInputOption } from "@app/types/single-selection-input-option";
import { LabelInputComponent } from "../label-input/label-input.component";
import { FormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrl: "./dropdown.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        LabelInputComponent,
        FormsModule,
        AsyncPipe,
        TranslateModule,
    ],
})
export class DropdownComponent<T> implements OnChanges {
  private readonly NO_SELECTION_ITEM: SingleSelectionInputOption<any> = {
    id: "DROPDOWN_NO_SELECTION",
    name: "-",
  };

  @Input()
  label: Nullable<string>;

  @Input()
  tooltip: Nullable<string>;

  @Input({ required: true })
  value: Nullable<SingleSelectionInputOption<T>>;

  @Input({ required: true })
  values: SingleSelectionInputOption<T>[];

  @Output()
  valueChange: EventEmitter<Nullable<SingleSelectionInputOption<T>>> =
    new EventEmitter();

  protected _items: SingleSelectionInputOption<T>[];
  protected _selectedItem: Nullable<SingleSelectionInputOption<T>>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["values"]) {
      this._items = [this.NO_SELECTION_ITEM, ...this.values];
    }
    if (changes["value"] || changes["values"]) {
      this._selectedItem =
        this.findItemById(this.value?.id) ?? this.NO_SELECTION_ITEM;
    }
  }

  private findItemById(
    id: Nullable<string>,
  ): Nullable<SingleSelectionInputOption<T>> {
    return this._items.find((item) => item.id === id);
  }

  onChange(option: SingleSelectionInputOption<T>): void {
    if (option.id === this.NO_SELECTION_ITEM.id) {
      this.valueChange.emit(null);
    } else {
      this.valueChange.emit(option);
    }
  }
}
