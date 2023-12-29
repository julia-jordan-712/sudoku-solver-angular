import {
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
import { Logger } from "@app/core/log/logger";
import { Nullable } from "@app/shared/types/nullable";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sudoku-grid-cell",
  templateUrl: "./sudoku-grid-cell.component.html",
  styleUrls: ["./sudoku-grid-cell.component.scss"],
})
export class SudokuGridCellComponent implements OnInit, OnChanges, OnDestroy {
  private logger: Logger = new Logger(SudokuGridCellComponent.name);
  value: Nullable<number>;

  notes: Nullable<number[]>;
  numbers: number[] = [];
  noteGridColumns = "";
  size = 32;

  @Input({ required: true })
  cell: SudokuGridCell;

  @Input({ required: true })
  maxValue = 1;

  @Input()
  @HostBinding("class.border-top")
  borderTop = false;

  @Input()
  @HostBinding("class.border-right")
  borderRight = false;

  @Input()
  @HostBinding("class.border-bottom")
  borderBottom = false;

  @Input()
  @HostBinding("class.border-left")
  borderLeft = false;

  @Input()
  @HostBinding("class.duplicate")
  isDuplicate = false;
  @HostBinding("class.invalid")
  invalid = false;

  @HostBinding("class.focused")
  isFocused = false;
  setFocus(focused: boolean): void {
    this.isFocused = focused;
  }

  @Input()
  @HostBinding("class.readonly")
  readonly: Nullable<boolean> = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

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
    StopWatch.monitor<void>(() => this.onChanges(changes), this.logger, {
      message: "ngOnChanges",
    });
  }

  private onChanges(changes: SimpleChanges): void {
    if (changes["maxValue"]) {
      this.numbers = Array(this.maxValue)
        .fill(0)
        .map((_, i) => i + 1);
      const sqrt = Math.ceil(Math.sqrt(this.maxValue));
      this.noteGridColumns = `repeat(${sqrt}, auto)`;
      this.size = Math.max(32, 16 + 10 * sqrt);
    }

    if (changes["cell"]) {
      if (isArray(this.cell)) {
        this.notes = this.cell;
        this.value = null;
        this.readonly = true;
      } else if (isNotArray(this.cell)) {
        this.notes = null;
        this.value = this.cell;
      }
    }

    this.validator.setMaxValue(this.maxValue);
    this.resetValue();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private onChange(value: number): void {
    if (this.readonly || !this.validator.isValid(value)) {
      this.resetValue();
    } else {
      this.valueChange.emit(value);
    }
  }

  private resetValue(): void {
    this.inputField.reset(this.value, { onlySelf: true, emitEvent: false });
  }

  trackByFn(index: number): number {
    return index;
  }
}
