import { Nullable } from "@app/shared/types/nullable";
import { SingleSelectionInputOption } from "@app/shared/types/single-selection-input-option";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

export type SudokuDropdownSelectionItem = SingleSelectionInputOption<
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
