import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SudokuGridCellValidator } from '@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell.validator';
import { SudokuGridCell } from '@app/shared/types/sudoku-grid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sudoku-grid-cell',
  templateUrl: './sudoku-grid-cell.component.html',
  styleUrls: ['./sudoku-grid-cell.component.scss'],
})
export class SudokuGridCellComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true })
  cell: SudokuGridCell;

  @Input({ required: true })
  maxValue = 1;

  @Input()
  @HostBinding('class.end-of-square')
  isEndOfSquare = false;

  @Input()
  @HostBinding('class.duplicate')
  isDuplicate = false;

  @HostBinding('class.focused')
  isFocused = false;
  setFocus(focused: boolean): void {
    this.isFocused = focused;
  }

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  readonly inputField = new FormControl();
  private readonly subscriptions: Subscription[] = [];
  private readonly validator: SudokuGridCellValidator = new SudokuGridCellValidator();

  ngOnInit(): void {
    this.subscriptions.push(
      this.inputField.valueChanges.subscribe((value) => this.onChange(value))
    );
    this.inputField.addValidators(this.validator.validator);
  }

  ngOnChanges(): void {
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
    this.inputField.setValue(this.cell, { onlySelf: true, emitEvent: false });
  }
}
