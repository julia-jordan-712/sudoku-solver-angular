import { DropdownInputOption } from "@app/components/interactions/dropdown-input/dropdown-input-option";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export type SudokuDropdownSelectionItem = DropdownInputOption<
  Nullable<SudokuGrid>
>;

export const SudokuPuzzleStateKey = "sudokuPuzzle";

export interface SudokuPuzzleState {
  show: boolean;
  height: Nullable<number>;
  width: Nullable<number>;
  selectionOptions: {
    options: SudokuDropdownSelectionItem[];
    selectedId: Nullable<string>;
  };
  sudoku: Nullable<SudokuGrid>;
}
