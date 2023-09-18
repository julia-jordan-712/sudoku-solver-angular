import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-number-input",
  template: `{{ value }}`,
})
export class NumberInputTestComponent {
  @Input()
  label: Nullable<string>;

  @Input()
  value: Nullable<number>;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  change(value: number): void {
    this.valueChange.emit(value);
  }
}
