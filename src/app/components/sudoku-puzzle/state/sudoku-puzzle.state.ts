import { DropdownInputOption } from "@app/components/interactions/dropdown-input/dropdown-input.component";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export interface SudokuDropdownSelectionItem extends DropdownInputOption {
  grid: SudokuGrid | undefined;
}

export interface SudokuPuzzleState {
  isConfirmed: boolean;
  height: Nullable<number>;
  width: Nullable<number>;
  selectionOptions: {
    options: SudokuDropdownSelectionItem[];
    selected: Nullable<SudokuDropdownSelectionItem>;
  };
  sudoku: Nullable<SudokuGrid>;
}
