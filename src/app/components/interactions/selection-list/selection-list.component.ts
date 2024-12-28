import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SingleSelectionInputOption } from "@app/shared/types/single-selection-input-option";

@Component({
  selector: "app-selection-list",
  templateUrl: "./selection-list.component.html",
  styleUrls: ["./selection-list.component.scss"],
})
export class SelectionListComponent<T> {
  @Input()
  label: Nullable<string>;

  @Input()
  tooltip: Nullable<string>;

  @Input({ required: true })
  value: Nullable<SingleSelectionInputOption<T>>;

  @Input({ required: true })
  values: SingleSelectionInputOption<T>[] = [];

  @Output()
  valueChange: EventEmitter<SingleSelectionInputOption<T>> = new EventEmitter();

  selectValue(value: SingleSelectionInputOption<T>): void {
    if (value.id !== this.value?.id) {
      this.valueChange.emit(value);
    }
  }
}
