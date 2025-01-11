import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";

export const DevFunctionsStateKey = "development";

export interface DevFunctionsState {
  isDev: boolean;
  testSudokus: {
    options: SudokuDropdownSelectionItem[];
    selectedId: Nullable<string>;
  };
}
