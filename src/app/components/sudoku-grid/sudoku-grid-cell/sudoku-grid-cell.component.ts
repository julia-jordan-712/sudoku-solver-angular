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
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sudoku-grid-cell",
  templateUrl: "./sudoku-grid-cell.component.html",
  styleUrls: ["./sudoku-grid-cell.component.scss"],
})
export class SudokuGridCellComponent implements OnInit, OnChanges, OnDestroy {
  value: Nullable<number>;

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

  @HostBinding("class.focused")
  isFocused = false;
  setFocus(focused: boolean): void {
    this.isFocused = focused;
  }

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
    if (changes["cell"]) {
      if (isArray(this.cell)) {
        this.value = null;
      } else if (isNotArray(this.cell)) {
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
    if (this.inputField.valid) {
      this.valueChange.emit(value);
    } else {
      this.resetValue();
    }
  }

  private resetValue(): void {
    this.inputField.setValue(this.value, { onlySelf: true, emitEvent: false });
  }
}
