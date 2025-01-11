import { Injectable, SimpleChanges } from "@angular/core";
import { isArray, isNotArray } from "@app/shared/util/is-array";
import { isDefined } from "@app/shared/util/is-defined";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { Nullable } from "@app/types/nullable";
import { SudokuGridCell, SudokuGridRow } from "@app/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
} from "@app/types/sudoku-grid-view-model";
import { BehaviorSubject, filter, Observable } from "rxjs";

@Injectable()
export class SudokuGridRowComponentService {
  private row$: BehaviorSubject<Nullable<SudokuGridRowViewModel>> =
    new BehaviorSubject<Nullable<SudokuGridRowViewModel>>(null);
  private highlightNumber$: BehaviorSubject<Nullable<number>> =
    new BehaviorSubject<Nullable<number>>(null);
  private highlightCells$: BehaviorSubject<boolean[]> = new BehaviorSubject<
    boolean[]
  >([]);

  getRow(): Observable<SudokuGridRowViewModel> {
    return this.row$.asObservable().pipe(filter(isDefined));
  }

  getHighlightCells(): Observable<boolean[]> {
    return this.highlightCells$.asObservable().pipe(filter(isDefined));
  }

  setRow(row: Nullable<SudokuGridRowViewModel>): void {
    this.row$.next(row);
  }

  setHighlightNumber(highlightNumber: Nullable<number>): void {
    this.highlightNumber$.next(highlightNumber);
  }

  onChanges(changes: SimpleChanges): void {
    if (changes["row"] || changes["highlightNumber"]) {
      const row: Nullable<SudokuGridRowViewModel> = this.row$.getValue();
      const highlightNumber: Nullable<number> =
        this.highlightNumber$.getValue();
      if (row && highlightNumber != null) {
        this.highlightCells$.next(
          this.determineCellsToBeHighlighted(row, highlightNumber),
        );
      } else {
        this.highlightCells$.next([]);
      }
    }
  }

  private determineCellsToBeHighlighted(
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

  cellChanged(cell: SudokuGridCell, index: number): SudokuGridCellChangeEvent {
    const row: Nullable<SudokuGridRowViewModel> = this.row$.getValue();
    if (row && index >= 0 && index < row.cells.length) {
      if (
        isNotArray(cell) ||
        (isArray(cell) && cell.length > 0 && cell.length <= row.cells.length)
      ) {
        const newRow: SudokuGridRow = [
          ...SudokuGridViewModelConverter.createRowFromViewModel(row),
        ];
        newRow[index] = cell;
        return { rowChanged: true, newRow: newRow };
      }
    }
    return { rowChanged: false };
  }
}

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
