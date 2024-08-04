import { Injectable, SimpleChanges } from "@angular/core";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell, SudokuGridRow } from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
} from "@app/shared/types/sudoku-grid-view-model";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";

@Injectable()
export class SudokuGridRowComponentService {
  determineCellsToBeHighlighted(
    changes: SimpleChanges,
    row: Nullable<SudokuGridRowViewModel>,
    highlightNumber: Nullable<number>,
  ): SudokuGridCellsHighlightResult {
    if (changes["row"] || changes["highlightNumber"]) {
      if (row && highlightNumber != null) {
        return {
          updateHighlightedCells: true,
          newCells: this.cellsToBeHighlighted(row, highlightNumber),
        };
      } else {
        return { updateHighlightedCells: true, newCells: [] };
      }
    }
    return { updateHighlightedCells: false };
  }

  private cellsToBeHighlighted(
    row: SudokuGridRowViewModel,
    numberToHighlight: number,
  ): boolean[] {
    return row.cells
      .map((viewModel: SudokuGridCellViewModel) => viewModel.cell)
      .map(
        (cell: SudokuGridCell) =>
          (isNotArray(cell) && cell === numberToHighlight) ||
          (isArray(cell) && cell.includes(numberToHighlight)),
      );
  }

  cellChanged(
    row: Nullable<SudokuGridRowViewModel>,
    cell: SudokuGridCell,
    index: number,
  ): SudokuGridCellChangeEvent {
    if (row && index >= 0 && index < row.cells.length) {
      const newRow: SudokuGridRow = [
        ...SudokuGridViewModelConverter.createRowFromViewModel(row),
      ];
      newRow[index] = cell;
      return { rowChanged: true, newRow: newRow };
    }
    return { rowChanged: false };
  }
}

interface SudokuGridCellsHighlightChanged {
  updateHighlightedCells: true;
  newCells: boolean[];
}
interface SudokuGridCellsHighlightUnchanged {
  updateHighlightedCells: false;
}
export type SudokuGridCellsHighlightResult =
  | SudokuGridCellsHighlightChanged
  | SudokuGridCellsHighlightUnchanged;

interface SudokuGridCellChangedEvent {
  rowChanged: true;
  newRow: SudokuGridRow;
}
interface SudokuGridCellUnchangedEvent {
  rowChanged: false;
}
export type SudokuGridCellChangeEvent =
  | SudokuGridCellChangedEvent
  | SudokuGridCellUnchangedEvent;
