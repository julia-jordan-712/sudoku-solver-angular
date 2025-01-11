import { Injectable } from "@angular/core";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Nullable } from "@app/types/nullable";
import { SudokuGrid, SudokuGridRow } from "@app/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/types/sudoku-grid-view-model";

@Injectable()
export class SudokuGridComponentService {
  rowChanged(
    grid: Nullable<SudokuGridViewModel>,
    row: SudokuGridRow,
    index: number,
  ): SudokuGridRowChangeEvent {
    if (
      grid &&
      index >= 0 &&
      index < grid.rows.length &&
      row.length === grid.rows[0]?.cells.length
    ) {
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
