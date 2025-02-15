import { SudokuDropdownSelectionItem } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.state";
import { Nullable } from "@app/types/nullable";

export const DevelopmentStateKey = "development";

export interface DevelopmentState {
  show: boolean;
  testSudokus: {
    options: SudokuDropdownSelectionItem[];
    selectedId: Nullable<string>;
  };
}
