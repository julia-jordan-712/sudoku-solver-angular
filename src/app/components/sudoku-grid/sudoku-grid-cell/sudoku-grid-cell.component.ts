import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { SudokuGridCellViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { Objects } from "@app/shared/util/objects";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-sudoku-grid-cell",
  templateUrl: "./sudoku-grid-cell.component.html",
  styleUrls: ["./sudoku-grid-cell.component.scss"],
})
export class SudokuGridCellComponent {
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
    this.maxValue = cell.maxValue;
    this.size = cell.widthAndHeight;
  }

  size = 32;
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

  @HostBinding("class.changed")
  changed = false;

  @Input()
  @HostBinding("class.readonly")
  readonly: Nullable<boolean> = false;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

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
    this.changed =
      (this.previousValue != null && this.previousValue !== this.value) ||
      !Objects.arraysEqual(this.previousValues, this.values);
  }

  onChange(value: number): void {
    this.valueChange.emit(value);
  }

  isHoveringOverCell = false;
  timeOutFnId: Nullable<number> = null;

  @HostListener("mouseenter")
  onMouseEnter(): void {
    if (!this.isHoveringOverCell && this.changed) {
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
      this.displayValues$.next(this.previousValues);
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
