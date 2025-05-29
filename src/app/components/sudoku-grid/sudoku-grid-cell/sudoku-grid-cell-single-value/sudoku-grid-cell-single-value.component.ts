import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { SudokuGridCellValidator } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.validator";
import { Nullable } from "@app/types/nullable";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sudoku-grid-cell-single-value",
  templateUrl: "./sudoku-grid-cell-single-value.component.html",
  styleUrl: "./sudoku-grid-cell-single-value.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SudokuGridCellSingleValueComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input({ required: true })
  value: Nullable<number>;

  @Input({ required: true })
  size = 32;

  @Input({ required: true })
  maxValue = 1;

  @Input({ required: true })
  @HostBinding("class.readonly")
  readonly: Nullable<boolean> = false;

  @Input({ required: true })
  @HostBinding("class.duplicate")
  isDuplicate = false;

  @Input({ required: true })
  @HostBinding("class.highlight")
  highlight = false;

  @Input({ required: true })
  @HostBinding("class.changed")
  changed = false;

  @HostBinding("class.invalid")
  invalid = false;

  @HostBinding("class.focused")
  isFocused = false;
  setFocus(focused: boolean): void {
    this.isFocused = focused;
  }

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  @Output()
  valueSubmit: EventEmitter<number> = new EventEmitter();

  readonly inputField = new FormControl();
  private readonly subscriptions: Subscription[] = [];
  private readonly validator: SudokuGridCellValidator =
    new SudokuGridCellValidator();

  ngOnInit(): void {
    this.subscriptions.push(
      this.inputField.valueChanges.subscribe((value) => this.onChange(value)),
    );
    this.inputField.addValidators(this.validator.validator);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["maxValue"]) {
      this.validator.setMaxValue(this.maxValue);
    }
    this.resetValue();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  blur(): void {
    if (this.invalid) {
      this.resetValue();
    }
    this.setFocus(false);
    this.valueSubmit.emit(this.inputField.value);
  }

  private onChange(value: number): void {
    if (this.readonly) {
      this.resetValue();
      return;
    }
    this.invalid = !this.validator.isValid(value);
    this.valueChange.emit(value);
  }

  private resetValue(): void {
    this.inputField.reset(this.value, { onlySelf: true, emitEvent: false });
    this.invalid = false;
  }
}
