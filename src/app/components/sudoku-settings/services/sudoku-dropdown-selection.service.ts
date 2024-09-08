import { Injectable } from "@angular/core";
import { SudokuDropdownSelectionTestData } from "@app/components/sudoku-settings/state/sudoku-dropdown-selection-test-data";
import { SudokuDropdownSelectionItem } from "@app/components/sudoku-settings/state/sudoku-puzzle.state";

@Injectable({
  providedIn: "root",
})
export class SudokuDropdownSelectionService {
  public readonly NO_SELECTION_ITEM: SudokuDropdownSelectionItem =
    SudokuDropdownSelectionTestData.NO_SELECTION_ITEM;

  getItems(): SudokuDropdownSelectionItem[] {
    return SudokuDropdownSelectionTestData.ITEMS;
  }
}
