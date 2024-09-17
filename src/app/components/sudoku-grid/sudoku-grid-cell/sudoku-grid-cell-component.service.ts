import { Injectable } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { Objects } from "@app/shared/util/objects";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SudokuGridCellComponentService {
  private value: Nullable<number>;
  private values: Nullable<number[]>;
  private previousValue: Nullable<number>;
  private previousValues: Nullable<number[]>;

  private displayValue$: BehaviorSubject<Nullable<number>> =
    new BehaviorSubject<Nullable<number>>(null);
  private displayValues$: BehaviorSubject<Nullable<number[]>> =
    new BehaviorSubject<Nullable<number[]>>(null);
  private changed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  private isHoveringOverCell = false;
  private timeOutFnId: Nullable<number> = null;

  getDisplayValue(): Observable<Nullable<number>> {
    return this.displayValue$.asObservable();
  }

  getDisplayValues(): Observable<Nullable<number[]>> {
    return this.displayValues$.asObservable();
  }

  isChanged(): Observable<boolean> {
    return this.changed$.asObservable();
  }

  setCell(cell: SudokuGridCell, highlightChangedCells: boolean): void {
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

    if (highlightChangedCells) {
      const previousValueChanged: boolean =
        this.previousValue != null && this.previousValue !== this.value;
      const previousValuesChanged: boolean = !Objects.arraysEqualIgnoringOrder(
        this.previousValues,
        this.values,
      );
      this.changed$.next(previousValueChanged || previousValuesChanged);
    }
  }

  onMouseEnter(): void {
    if (!this.isHoveringOverCell && this.changed$.getValue()) {
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
