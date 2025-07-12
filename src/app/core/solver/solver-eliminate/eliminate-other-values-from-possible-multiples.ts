import { PossibleValuesIterator } from "@app/core/solver/solver-eliminate/util/possible-multiples-iterator";
import { SolverRunnable } from "@app/core/solver/types/solver-runnable";
import { CellPosition } from "@app/types/cell-position";
import { CellPositionMap } from "@app/types/cell-position-map";
import { SudokuGrid, SudokuGridCell } from "@app/types/sudoku-grid";
import { isArray } from "@app/util/is-array";
import { SudokuGridUtil } from "@app/util/sudoku-grid-util";

interface PossibleMultiplesResult {
  values: number[];
  rows: Set<CellPosition>;
  columns: Set<CellPosition>;
  squares: Set<CellPosition>;
}

/**
 * Identifies combinations of N possible values (= pairs/triples/etc) which can only occur in N cells
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
    return new PossibleValuesIterator().iterate(
      (g, p, c) => this.eliminateNextPossibleMultiples(g, p, c),
      grid,
    );
  }

  private eliminateNextPossibleMultiples(
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
    combinationValues: number[],
  ): boolean {
    const result: PossibleMultiplesResult = this.isPossibleMultiple(
      combinationValues,
      grid,
      squarePositionsMap,
    );
    let valuesEliminated = this.eliminate(result.rows, combinationValues, grid);
    valuesEliminated =
      this.eliminate(result.columns, combinationValues, grid) ||
      valuesEliminated;
    valuesEliminated =
      this.eliminate(result.squares, combinationValues, grid) ||
      valuesEliminated;
    return valuesEliminated;
  }

  private isPossibleMultiple(
    combinationValues: number[],
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
  ): PossibleMultiplesResult {
    return {
      values: combinationValues,
      rows: this.findRowPositionsContainingThisCombination(
        combinationValues,
        grid,
      ),
      columns: this.findColumnPositionsContainingThisCombination(
        combinationValues,
        grid,
      ),
      squares: this.findSquarePositionsContainingThisCombination(
        combinationValues,
        grid,
        squarePositionsMap,
      ),
    };
  }

  private findRowPositionsContainingThisCombination(
    combinationValues: number[],
    grid: SudokuGrid,
  ): Set<CellPosition> {
    const rows: Set<CellPosition> = new Set();

    for (let i = 0; i < grid.length; i++) {
      const rowPositionsContainingCombinationValues: CellPosition[] = [];
      const combinationValuesFoundInRow: Set<number> = new Set();

      const rowCells: SudokuGridCell[] = grid[i]!;
      for (let j = 0; j < grid.length; j++) {
        const containedInRow = this.containedCombinationValues(
          combinationValues,
          rowCells[j],
        );
        if (containedInRow.length > 0) {
          containedInRow.forEach((v) => combinationValuesFoundInRow.add(v));
          rowPositionsContainingCombinationValues.push(new CellPosition(i, j));
        }
      }
      if (
        rowPositionsContainingCombinationValues.length ===
          combinationValues.length &&
        combinationValuesFoundInRow.size === combinationValues.length
      ) {
        rowPositionsContainingCombinationValues.forEach((p) => rows.add(p));
      }
    }
    return rows;
  }

  private findColumnPositionsContainingThisCombination(
    combinationValues: number[],
    grid: SudokuGrid,
  ): Set<CellPosition> {
    const columns: Set<CellPosition> = new Set();

    for (let i = 0; i < grid.length; i++) {
      const columnPositionsContainingCombinationValues: CellPosition[] = [];
      const combinationValuesFoundInColumn: Set<number> = new Set();

      const columnCells: SudokuGridCell[] = SudokuGridUtil.getColumnCells(
        grid,
        i,
      );
      for (let j = 0; j < grid.length; j++) {
        const containedInColumn = this.containedCombinationValues(
          combinationValues,
          columnCells[j],
        );
        if (containedInColumn.length > 0) {
          containedInColumn.forEach((v) =>
            combinationValuesFoundInColumn.add(v),
          );
          columnPositionsContainingCombinationValues.push(
            new CellPosition(j, i),
          );
        }
      }
      if (
        columnPositionsContainingCombinationValues.length ===
          combinationValues.length &&
        combinationValuesFoundInColumn.size === combinationValues.length
      ) {
        columnPositionsContainingCombinationValues.forEach((p) =>
          columns.add(p),
        );
      }
    }
    return columns;
  }

  private findSquarePositionsContainingThisCombination(
    combinationValues: number[],
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
  ): Set<CellPosition> {
    const squares: Set<CellPosition> = new Set();

    for (let i = 0; i < grid.length; i++) {
      const squarePositionsContainingCombinationValues: CellPosition[] = [];
      const combinationValuesFoundInSquare: Set<number> = new Set();
      squarePositionsMap.getForSquareIndex(i).forEach((position) => {
        const containedInSquare = this.containedCombinationValues(
          combinationValues,
          grid[position.x][position.y],
        );
        if (containedInSquare.length > 0) {
          containedInSquare.forEach((v) =>
            combinationValuesFoundInSquare.add(v),
          );
          squarePositionsContainingCombinationValues.push(position);
        }
      });
      if (
        squarePositionsContainingCombinationValues.length ===
          combinationValues.length &&
        combinationValuesFoundInSquare.size === combinationValues.length
      ) {
        squarePositionsContainingCombinationValues.forEach((p) =>
          squares.add(p),
        );
      }
    }
    return squares;
  }

  private containedCombinationValues(
    combinationValues: number[],
    cell: SudokuGridCell,
  ): number[] {
    return isArray(cell)
      ? cell.filter((v) => combinationValues.includes(v))
      : [];
  }

  private eliminate(
    positions: Set<CellPosition>,
    combinationValues: number[],
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    for (const row of positions) {
      const keptCombinationValues = this.keepOnlyCombinationValuesInCell(
        combinationValues,
        grid[row.x][row.y],
      );
      grid[row.x][row.y] = keptCombinationValues.cell;
      valuesEliminated =
        valuesEliminated || keptCombinationValues.valuesEliminated;
    }
    return valuesEliminated;
  }

  private keepOnlyCombinationValuesInCell(
    combinationValues: number[],
    cell: SudokuGridCell,
  ): { cell: SudokuGridCell; valuesEliminated: boolean } {
    if (isArray(cell)) {
      const lengthBeforeFilter = cell.length;
      const filteredCell = cell.filter((v) => combinationValues.includes(v));
      return {
        cell: filteredCell,
        valuesEliminated: lengthBeforeFilter !== filteredCell.length,
      };
    }
    return { cell, valuesEliminated: false };
  }
}
