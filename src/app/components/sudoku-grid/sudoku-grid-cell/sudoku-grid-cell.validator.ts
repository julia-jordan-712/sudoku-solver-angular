import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Nullable } from "@app/types/nullable";

export class SudokuGridCellValidator {
  private maxValue: number | null = null;

  setMaxValue(maxValue: number | null): void {
    this.maxValue = maxValue;
  }

  readonly validator: ValidatorFn = (control: AbstractControl) =>
    this.validate(control.value);

  isValid(value: Nullable<number>): boolean {
    return this.validate(value) == null;
  }

  validate(value: Nullable<number>): ValidationErrors | null {
    if (value == null) {
      return null;
    }
    if (Number.isNaN(value)) {
      return { nan: value };
    }
    if (value < 1) {
      return { min: value };
    } else if (this.maxValue != null && value > this.maxValue) {
      return { max: value };
    }
    return null;
  }
}
