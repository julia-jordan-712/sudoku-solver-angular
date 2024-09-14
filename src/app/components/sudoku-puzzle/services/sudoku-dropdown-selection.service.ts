import { Injectable } from "@angular/core";
import { SudokuPuzzleSelectionTestData } from "@app/components/sudoku-puzzle/state/sudoku-puzzle-selection-test-data";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";

@Injectable({
  providedIn: "root",
})
export class SudokuDropdownSelectionService {
  public readonly NO_SELECTION_ITEM: SudokuDropdownSelectionItem =
    SudokuPuzzleSelectionTestData.NO_SELECTION_ITEM;

  getItems(): SudokuDropdownSelectionItem[] {
    return SudokuPuzzleSelectionTestData.ITEMS;
  }
}
