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
import { LabelInputComponent } from "../label-input/label-input.component";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-number-input",
    templateUrl: "./number-input.component.html",
    styleUrl: "./number-input.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [LabelInputComponent, FormsModule],
})
export class NumberInputComponent implements OnChanges {
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

  protected _value: Nullable<number>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      this._value = this.value;
    }
  }

  onChange(value: Nullable<number>): void {
    this._value = value;
    this.valueChange.emit(value);
  }
}
