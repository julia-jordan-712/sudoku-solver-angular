import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-selection-list",
  templateUrl: "./selection-list.component.html",
  styleUrls: ["./selection-list.component.scss"],
})
export class SelectionListComponent {
  @Input()
  label: Nullable<string>;

  @Input()
  tooltip: Nullable<string>;

  @Input({ required: true })
  value: Nullable<number>;

  @Input({ required: true })
  values: number[] = [];

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  selectValue(value: number): void {
    if (value !== this.value) {
      this.valueChange.emit(value);
    }
  }
}
