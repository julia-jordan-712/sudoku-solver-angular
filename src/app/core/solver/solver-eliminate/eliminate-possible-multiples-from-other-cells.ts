import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { CellPosition } from "@app/types/cell-position";
import { CellPositionMap } from "@app/types/cell-position-map";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";
import { isArray } from "@app/util/is-array";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";

interface PossibleMultiplesResult {
  values: number[];
  rows: number[];
  columns: number[];
  squares: number[];
}

/**
 * Identifies combinations of N possible values (= pairs/triples/etc) which can only occur in N cells
 * of a row/column/square and eliminates them from the other possible values in this row/column/square.
 *
 * Only one elimination is done and then the solver returns. The first checked combination
 * is [1,2] and the next is [1,3] and so on until the last pair ([8,9] for a 9x9 Sudoku).
 * If no pair is identified, the next checked combination is [1,2,3] and then [1,2,4] and so on.
 *
 * Example: A row contains [1,3,4,5], [3,5], [4,5], [3,5] as possible values. Since
 * the numbers 3 and 5 occur as a pair [3,5] exactly twice, this means that 3 and 5
 * are actually not possible in the other cells and the possible values can be reduced
 * to [1,4], [3,5], [4], [3,5].
 */
export class EliminatePossibleMultiplesFromOtherCells
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
          this.isPossibleMultiple([v1, v2], grid, squarePositionsMap);
        let valuesEliminated = this.eliminateRows(
          possibleMultiplesResult,
          [v1, v2],
          grid,
        );
        valuesEliminated =
          this.eliminateColumns(possibleMultiplesResult, [v1, v2], grid) ||
          valuesEliminated;
        valuesEliminated =
          this.eliminateSquares(
            squarePositionsMap,
            possibleMultiplesResult,
            [v1, v2],
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
    combinationValues: number[],
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
  ): PossibleMultiplesResult {
    const rows: number[] = [];
    const columns: number[] = [];
    const squares: number[] = [];

    for (let i = 0; i < grid.length; i++) {
      const rowPositions: CellPosition[] = [];
      const columnPositions: CellPosition[] = [];

      const rowCells: SudokuGridCell[] = grid[i]!;
      const columnCells: SudokuGridCell[] = SudokuGridUtil.getColumnCells(
        grid,
        i,
      );
      for (let j = 0; j < grid.length; j++) {
        if (this.containsOnlySearchedValues(combinationValues, rowCells[j])) {
          rowPositions.push(new CellPosition(i, j));
        }
        if (
          this.containsOnlySearchedValues(combinationValues, columnCells[j])
        ) {
          columnPositions.push(new CellPosition(j, i));
        }
      }

      const squarePositions: CellPosition[] = squarePositionsMap
        .getForSquareIndex(i)
        .filter((position) =>
          this.containsOnlySearchedValues(
            combinationValues,
            grid[position.x][position.y],
          ),
        );

      if (rowPositions.length === combinationValues.length) {
        rows.push(i);
      }
      if (columnPositions.length === combinationValues.length) {
        columns.push(i);
      }
      if (squarePositions.length === combinationValues.length) {
        squares.push(i);
      }
    }
    return { values: combinationValues, rows, columns, squares };
  }

  private containsOnlySearchedValues(
    combinationValues: number[],
    cell: SudokuGridCell,
  ): boolean {
    return (
      isArray(cell) &&
      cell.length <= combinationValues.length &&
      cell.every((v) => combinationValues.includes(v))
    );
  }

  private eliminateRows(
    possibleMultiplesResult: PossibleMultiplesResult,
    combinationValues: number[],
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const row of possibleMultiplesResult.rows) {
      for (let i = 0; i < grid.length; i++) {
        const removeValues = this.removeCombinationValuesFromCell(
          combinationValues,
          grid[row][i],
        );
        grid[row][i] = removeValues.cell;
        valuesEliminated = valuesEliminated || removeValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateColumns(
    possibleMultiplesResult: PossibleMultiplesResult,
    combinationValues: number[],
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const column of possibleMultiplesResult.columns) {
      for (let i = 0; i < grid.length; i++) {
        const removeValues = this.removeCombinationValuesFromCell(
          combinationValues,
          grid[i][column],
        );
        grid[i][column] = removeValues.cell;
        valuesEliminated = valuesEliminated || removeValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateSquares(
    squarePositionsMap: CellPositionMap,
    possibleMultiplesResult: PossibleMultiplesResult,
    combinationValues: number[],
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const square of possibleMultiplesResult.squares) {
      squarePositionsMap.getForSquareIndex(square).forEach((cellPosition) => {
        const removeValues = this.removeCombinationValuesFromCell(
          combinationValues,
          grid[cellPosition.x][cellPosition.y],
        );
        grid[cellPosition.x][cellPosition.y] = removeValues.cell;
        valuesEliminated = valuesEliminated || removeValues.valuesEliminated;
      });
    }
    return valuesEliminated;
  }

  private removeCombinationValuesFromCell(
    combinationValues: number[],
    cell: SudokuGridCell,
  ): { cell: SudokuGridCell; valuesEliminated: boolean } {
    if (isArray(cell)) {
      if (!this.containsOnlySearchedValues(combinationValues, cell)) {
        const lengthBeforeFilter = cell.length;
        const filteredCell = cell.filter((v) => !combinationValues.includes(v));
        return {
          cell: filteredCell,
          valuesEliminated: lengthBeforeFilter !== filteredCell.length,
        };
      }
    }
    return { cell, valuesEliminated: false };
  }
}
