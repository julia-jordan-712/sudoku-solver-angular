import { SolverRunnable } from "@app/core/solver/solver-runnable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";

interface PossiblePairResult {
  v1: number;
  v2: number;
  row?: number;
  column?: number;
  square?: number;
}

/**
 * Identifies pairs of possible values which can only occur in two cells of a row/column/square
 * and eliminates other possible values from their cells.
 *
 * Only one elimination is done and then the solver returns. The first checked pair
 * is [1,2] and the next is [1,3] and so on until the last pair ([8,9] for a 9x9 Sudoku).
 *
 * Example:A row contains [1,4], [1,3,5], [2,4], [3,4,5] as possible values. Since
 * the numbers 3 and 5 occur as a pair [3,5] exactly twice, this means that no other values
 * are possible in these cells and the possible values can be reduced
 * to [1,4], [3,5], [2,4], [3,5].
 */
export class EliminateOtherCellsFromPossiblePair implements SolverRunnable {
  run(grid: SudokuGrid): boolean {
    return false;
  }
}
