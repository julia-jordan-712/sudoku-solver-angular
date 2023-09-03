import { Injectable } from '@angular/core';
import { Nullable } from '@app/shared/types/nullable';
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from '@app/shared/types/sudoku-grid';
import { SudokuGridUtil } from '@app/shared/util/sudoku-grid-util';

@Injectable({
  providedIn: 'root',
})
export class SudokuSettingsComponentService {
  updateGrid(
    value: SudokuGrid,
    height: Nullable<number>,
    width: Nullable<number>
  ): SudokuGrid {
    if (value.length <= 0) {
      if (width === 0 && height === 0) {
        return value;
      } else {
        return this.updateGrid_(value, height, width);
      }
    } else {
      if (value.length === height && value[0].length === width) {
        return value;
      } else {
        return this.updateGrid_(value, height, width);
      }
    }
  }

  private updateGrid_(
    value: SudokuGrid,
    height: Nullable<number>,
    width: Nullable<number>
  ): SudokuGrid {
    const result: SudokuGrid = SudokuGridUtil.clone(value);
    this.updateHeight(result, height ?? value.length);
    this.updateWidth(result, width ?? value[0]?.length ?? 0);
    return result;
  }

  private updateHeight(value: SudokuGrid, height: number): void {
    this.update(value, height, () => []);
  }

  private updateWidth(value: SudokuGrid, width: number): void {
    value.forEach((row: SudokuGridRow) =>
      this.update(row, width, () => undefined)
    );
  }

  private update(
    value: SudokuGrid | SudokuGridRow,
    limit: number,
    empty: () => SudokuGridRow | SudokuGridCell
  ): void {
    if (value.length < limit) {
      const missingElements = limit - value.length;
      for (let i = 0; i < missingElements; i++) {
        //@ts-ignore
        value.push(empty());
      }
    } else if (value.length > limit) {
      const tooManyElements = value.length - limit;
      value.splice(limit, tooManyElements);
    }
  }
}
