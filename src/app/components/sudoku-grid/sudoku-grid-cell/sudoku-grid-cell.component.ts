import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { SudokuGridCellViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-sudoku-grid-cell",
  templateUrl: "./sudoku-grid-cell.component.html",
  styleUrls: ["./sudoku-grid-cell.component.scss"],
})
export class SudokuGridCellComponent implements OnChanges {
  private value: Nullable<number>;
  private values: Nullable<number[]>;
  private previousValue: Nullable<number>;
  private previousValues: Nullable<number[]>;
  displayValue$: BehaviorSubject<Nullable<number>> = new BehaviorSubject<
    Nullable<number>
  >(null);
  displayValues$: BehaviorSubject<Nullable<number[]>> = new BehaviorSubject<
    Nullable<number[]>
  >(null);

  @Input({ required: true })
  set cell(cell: SudokuGridCellViewModel) {
    this.setCell(cell.cell);
  }

  size = 32;

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

  @Input()
  @HostBinding("class.highlight")
  highlight = false;

  @Input()
  @HostBinding("class.readonly")
  readonly: Nullable<boolean> = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["maxValue"]) {
      const sqrt = Math.ceil(Math.sqrt(this.maxValue));
      this.size = Math.max(32, 16 + 10 * sqrt);
    }
  }

  private setCell(cell: SudokuGridCell): void {
    this.previousValue = this.value;
    this.previousValues = this.values;

    if (isArray(cell)) {
      this.values = cell;
      this.value = null;
    } else if (isNotArray(cell)) {
      this.values = null;
      this.value = cell;
    }

    this.displayValue$.next(this.value);
    this.displayValues$.next(this.values);
  }

  onChange(value: number): void {
    this.valueChange.emit(value);
  }

  isHoveringOverCell = false;
  timeOutFnId: Nullable<number> = null;

  @HostListener("mouseenter")
  onMouseEnter(): void {
    if (!this.isHoveringOverCell) {
      this.isHoveringOverCell = true;
      this.startTimer(() => this.switchBetweenPreviousAndCurrentValue(1), 500);
    }
  }

  private switchBetweenPreviousAndCurrentValue(counter: number): void {
    this.stopTimer();
    if (!this.isHoveringOverCell) {
      return;
    }
    if (counter % 2 === 0) {
      this.displayValue$.next(this.value);
      this.displayValues$.next(this.values);
    } else {
      this.displayValue$.next(this.previousValue ?? this.value);
      this.displayValues$.next(this.previousValues ?? this.values);
    }
    this.startTimer(
      () => this.switchBetweenPreviousAndCurrentValue(++counter),
      1000,
    );
  }

  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.isHoveringOverCell = false;
    this.stopTimer();
    this.displayValue$.next(this.value);
    this.displayValues$.next(this.values);
  }

  private startTimer(callback: () => void, ms: number): void {
    this.stopTimer();
    if (this.isHoveringOverCell) {
      this.timeOutFnId = setTimeout(callback, ms) as unknown as number;
    }
  }

  private stopTimer(): void {
    if (this.timeOutFnId) {
      clearTimeout(this.timeOutFnId);
      this.timeOutFnId = null;
    }
  }
}
