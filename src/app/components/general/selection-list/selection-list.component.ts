import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Nullable } from "@app/types/nullable";
import { SingleSelectionInputOption } from "@app/types/single-selection-input-option";
import { LabelInputComponent } from "../label-input/label-input.component";
import { AsyncPipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-selection-list",
  templateUrl: "./selection-list.component.html",
  styleUrl: "./selection-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LabelInputComponent, AsyncPipe, TranslateModule],
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
