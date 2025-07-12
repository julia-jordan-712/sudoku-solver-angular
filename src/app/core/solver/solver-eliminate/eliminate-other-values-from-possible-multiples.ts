import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { CellPosition } from "@app/types/cell-position";
import { CellPositionMap } from "@app/types/cell-position-map";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";
import { isArray } from "@app/util/is-array";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";

  v1: number;
  v2: number;
interface PossibleMultiplesResult {
  rows: number[];
  columns: number[];
  squares: number[];
}

/**
 * Identifies combinations of N possible values (= pairs/triplets/etc) which can only occur in N cells
 * of a row/column/square and eliminates other possible values from these cells.
 *
 * Only one elimination is done and then the solver returns. The first checked combination
 * is [1,2] and the next is [1,3] and so on until the last pair ([8,9] for a 9x9 Sudoku).
 * If no pair is identified, the next checked combination is [1,2,3] and then [1,2,4] and so on.
 *
 * Example: A row contains [1,4], [1,3,5], [2,4], [3,4,5] as possible values. Since
 * the numbers 3 and 5 occur as a pair [3,5] exactly twice, this means that no other values
 * are possible in these cells and the possible values can be reduced
 * to [1,4], [3,5], [2,4], [3,5].
 */
export class EliminateOtherValuesFromPossibleMultiples
  implements SolverRunnable
{
  run(grid: SudokuGrid): boolean {
    return this.eliminateNextPossibleMultiples(grid);
  }

  private eliminateNextPossibleMultiples(grid: SudokuGrid): boolean {
    const squarePositionsMap: CellPositionMap =
      SudokuGridUtil.getCellPositionsOfSquares(grid.length);

    for (let v1 = 1; v1 <= grid.length; v1++) {
      for (let v2 = v1 + 1; v2 <= grid.length; v2++) {
        const possibleMultiplesResult: PossibleMultiplesResult =
          this.isPossibleMultiple(v1, v2, grid, squarePositionsMap);
        let valuesEliminated = this.eliminateRows(
          possibleMultiplesResult,
          v1,
          v2,
          grid,
        );
        valuesEliminated =
          this.eliminateColumns(possibleMultiplesResult, v1, v2, grid) ||
          valuesEliminated;
        valuesEliminated =
          this.eliminateSquares(
            squarePositionsMap,
            possibleMultiplesResult,
            v1,
            v2,
            grid,
          ) || valuesEliminated;
        if (valuesEliminated) {
          return true;
        }
      }
    }
    return false;
  }

  private isPossibleMultiple(
    v1: number,
    v2: number,
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
  ): PossibleMultiplesResult {
    const rows: number[] = [];
    const columns: number[] = [];
    const squares: number[] = [];

    for (let i = 0; i < grid.length; i++) {
      const rowPositionsContainingAllCombinationValues: CellPosition[] = [];
      const rowPositionsContainingSomeCombinationValues: CellPosition[] = [];
      const columnPositionsContainingAllCombinationValues: CellPosition[] = [];
      const columnPositionsContainingSomeCombinationValues: CellPosition[] = [];

      const rowCells: SudokuGridCell[] = grid[i]!;
      const columnCells: SudokuGridCell[] = SudokuGridUtil.getColumnCells(
        grid,
        i,
      );
      for (let j = 0; j < grid.length; j++) {
        if (this.containsAllCombinationValues(v1, v2, rowCells[j])) {
          rowPositionsContainingAllCombinationValues.push(
            new CellPosition(i, j),
          );
        } else if (
          this.containsSomeButNotAllCombinationValues(v1, v2, rowCells[j])
        ) {
          rowPositionsContainingSomeCombinationValues.push(
            new CellPosition(i, j),
          );
        }
        if (this.containsAllCombinationValues(v1, v2, columnCells[j])) {
          columnPositionsContainingAllCombinationValues.push(
            new CellPosition(j, i),
          );
        } else if (
          this.containsSomeButNotAllCombinationValues(v1, v2, columnCells[j])
        ) {
          columnPositionsContainingSomeCombinationValues.push(
            new CellPosition(i, j),
          );
        }
      }

      const squarePositionsContainingAllCombinationValues: CellPosition[] = [];
      const squarePositionsContainingSomeCombinationValues: CellPosition[] = [];
      squarePositionsMap.getForSquareIndex(i).forEach((position) => {
        if (
          this.containsAllCombinationValues(
            v1,
            v2,
            grid[position.x][position.y],
          )
        ) {
          squarePositionsContainingAllCombinationValues.push(position);
        } else if (
          this.containsSomeButNotAllCombinationValues(
            v1,
            v2,
            grid[position.x][position.y],
          )
        ) {
          squarePositionsContainingSomeCombinationValues.push(position);
        }
      });

      if (
        rowPositionsContainingAllCombinationValues.length === 2 &&
        rowPositionsContainingSomeCombinationValues.length === 0
      ) {
        rows.push(i);
      }
      if (
        columnPositionsContainingAllCombinationValues.length === 2 &&
        columnPositionsContainingSomeCombinationValues.length === 0
      ) {
        columns.push(i);
      }
      if (
        squarePositionsContainingAllCombinationValues.length === 2 &&
        squarePositionsContainingSomeCombinationValues.length === 0
      ) {
        squares.push(i);
      }
    }
    return { v1, v2, rows, columns, squares };
  }

  private containsAllCombinationValues(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): boolean {
    return isArray(cell) && cell.includes(v1) && cell.includes(v2);
  }

  private containsSomeButNotAllCombinationValues(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): boolean {
    return (
      isArray(cell) &&
      ((cell.includes(v1) && !cell.includes(v2)) ||
        (cell.includes(v2) && !cell.includes(v1)))
    );
  }

  private eliminateRows(
    possibleCombinationResult: PossibleMultiplesResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const row of possibleCombinationResult.rows) {
      for (let i = 0; i < grid.length; i++) {
        const keptCombinationValues = this.keepOnlyCombinationValuesInCell(
          v1,
          v2,
          grid[row][i],
        );
        grid[row][i] = keptCombinationValues.cell;
        valuesEliminated =
          valuesEliminated || keptCombinationValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateColumns(
    possibleCombinationResult: PossibleMultiplesResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const column of possibleCombinationResult.columns) {
      for (let i = 0; i < grid.length; i++) {
        const keptCombinationValues = this.keepOnlyCombinationValuesInCell(
          v1,
          v2,
          grid[i][column],
        );
        grid[i][column] = keptCombinationValues.cell;
        valuesEliminated =
          valuesEliminated || keptCombinationValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateSquares(
    squarePositionsMap: CellPositionMap,
    possibleMultiplesResult: PossibleMultiplesResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const square of possibleMultiplesResult.squares) {
      squarePositionsMap.getForSquareIndex(square).forEach((cellPosition) => {
        const keptCombinationValues = this.keepOnlyCombinationValuesInCell(
          v1,
          v2,
          grid[cellPosition.x][cellPosition.y],
        );
        grid[cellPosition.x][cellPosition.y] = keptCombinationValues.cell;
        valuesEliminated =
          valuesEliminated || keptCombinationValues.valuesEliminated;
      });
    }
    return valuesEliminated;
  }

  private keepOnlyCombinationValuesInCell(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): { cell: SudokuGridCell; valuesEliminated: boolean } {
    if (isArray(cell)) {
      if (this.containsAllCombinationValues(v1, v2, cell)) {
        const lengthBeforeFilter = cell.length;
        const filteredCell = cell.filter((v) => v === v1 || v === v2);
        return {
          cell: filteredCell,
          valuesEliminated: lengthBeforeFilter !== filteredCell.length,
        };
      }
    }
    return { cell, valuesEliminated: false };
  }
}
