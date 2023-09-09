import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class SudokuGridCellValidator {
  private maxValue: number | undefined;

  setMaxValue(maxValue: number): void {
    this.maxValue = maxValue;
  }

  readonly validator: ValidatorFn = (control: AbstractControl) =>
    this.validate(control.value);

  private validate(value: number): ValidationErrors | null {
    if (value < 1) {
      return { min: value };
    } else if (this.maxValue != undefined && value > this.maxValue) {
      return { max: value };
    }
    return null;
  }
}
