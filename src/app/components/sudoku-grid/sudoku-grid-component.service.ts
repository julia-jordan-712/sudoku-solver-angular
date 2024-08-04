import { Injectable } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";

@Injectable()
export class SudokuGridComponentService {
  rowChanged(
    grid: Nullable<SudokuGridViewModel>,
    row: SudokuGridRow,
    index: number,
  ): SudokuGridRowChangeEvent {
    if (grid && index >= 0 && index < grid.rows.length) {
      const newGrid: SudokuGrid = SudokuGridUtil.clone(
        SudokuGridViewModelConverter.createGridFromViewModel(grid),
      );
      newGrid[index] = row;
      return { gridChanged: true, newGrid: newGrid };
    }
    return { gridChanged: false };
  }
}

interface SudokuGridRowChangedEvent {
  gridChanged: true;
  newGrid: SudokuGrid;
}
interface SudokuGridRowUnchangedEvent {
  gridChanged: false;
}
export type SudokuGridRowChangeEvent =
  | SudokuGridRowChangedEvent
  | SudokuGridRowUnchangedEvent;
