import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-selection-list",
  template: `{{ value }}`,
})
export class SelectionListTestComponent {
  @Input()
  label: Nullable<string>;

  @Input()
  tooltip: Nullable<string>;

  @Input()
  value: Nullable<number>;

  @Input()
  values: number[] = [];

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  change(value: number): void {
    this.valueChange.emit(value);
  }
}
