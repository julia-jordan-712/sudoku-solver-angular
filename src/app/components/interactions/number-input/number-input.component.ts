import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";

@Component({
  selector: "app-number-input",
  templateUrl: "./number-input.component.html",
  styleUrls: ["./number-input.component.scss"],
})
export class NumberInputComponent {
  @Input()
  label: Nullable<string>;

  @Input()
  tooltip: Nullable<string>;

  @Input()
  value: Nullable<number>;

  @Input()
  inputWidth: Nullable<string>;

  @Output()
  valueChange: EventEmitter<Nullable<number>> = new EventEmitter();

  onChange(value: Nullable<number>): void {
    this.valueChange.emit(value);
  }
}
