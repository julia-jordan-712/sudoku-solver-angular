import { CellPosition } from "@app/shared/types/cell-position";
import { CellPositionMap } from "@app/shared/types/cell-position-map";
import { SudokuGrid, SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { isArray } from "@app/shared/util/is-array";
import { SudokuGridUtil } from "@app/shared/util/sudoku-grid-util";

interface PossiblePairResult {
  v1: number;
  v2: number;
  row?: number;
  column?: number;
  square?: number;
}

export class EliminatePossiblePair {
  run(grid: SudokuGrid): boolean {
    return this.eliminatePossiblePair(grid);
  }

  private eliminatePossiblePair(grid: SudokuGrid): boolean {
    const squarePositionsMap: CellPositionMap =
      SudokuGridUtil.getCellPositionsOfSquares(grid.length);

    for (let v1 = 1; v1 <= grid.length; v1++) {
      for (let v2 = v1 + 1; v2 <= grid.length; v2++) {
        const possiblePairResult: PossiblePairResult = this.isPossiblePair(
          v1,
          v2,
          grid,
          squarePositionsMap,
        );
        const valuesEliminated =
          this.eliminateRows(possiblePairResult, v1, v2, grid) ||
          this.eliminateColumns(possiblePairResult, v1, v2, grid) ||
          this.eliminateSquares(
            squarePositionsMap,
            possiblePairResult,
            v1,
            v2,
            grid,
          );
        if (valuesEliminated) {
          return true;
        }
      }
    }
    return false;
  }

  private isPossiblePair(
    v1: number,
    v2: number,
    grid: SudokuGrid,
    squarePositionsMap: CellPositionMap,
  ): PossiblePairResult {
    for (let i = 0; i < grid.length; i++) {
      const rowPositions: CellPosition[] = [];
      const columnPositions: CellPosition[] = [];

      const rowCells: SudokuGridCell[] = grid[i];
      const columnCells: SudokuGridCell[] = SudokuGridUtil.getColumnCells(
        grid,
        i,
      );
      for (let j = 0; j < grid.length; j++) {
        if (this.containsOnlySearchedPair(v1, v2, rowCells[j])) {
          rowPositions.push(new CellPosition(i, j));
        }
        if (this.containsOnlySearchedPair(v1, v2, columnCells[j])) {
          columnPositions.push(new CellPosition(j, i));
        }
      }

      const squarePositions: CellPosition[] = squarePositionsMap
        .getForSquareIndex(i)
        .filter((position) =>
          this.containsOnlySearchedPair(v1, v2, grid[position.x][position.y]),
        );

      const row = rowPositions.length === 2 ? i : undefined;
      const column = columnPositions.length === 2 ? i : undefined;
      const square = squarePositions.length === 2 ? i : undefined;

      if (row != undefined || column != undefined || square != undefined) {
        return { v1, v2, row, column, square };
      }
    }
    return { v1, v2 };
  }

  private containsOnlySearchedPair(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): boolean {
    return (
      isArray(cell) &&
      cell.length === 2 &&
      cell.includes(v1) &&
      cell.includes(v2)
    );
  }

  private eliminateRows(
    possiblePairResult: PossiblePairResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    if (possiblePairResult.row) {
      for (let i = 0; i < grid.length; i++) {
        const removePairValues = this.removePairValuesFromCell(
          v1,
          v2,
          grid[possiblePairResult.row][i],
        );
        grid[possiblePairResult.row][i] = removePairValues.cell;
        valuesEliminated =
          valuesEliminated || removePairValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateColumns(
    possiblePairResult: PossiblePairResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    if (possiblePairResult.column) {
      for (let i = 0; i < grid.length; i++) {
        const removePairValues = this.removePairValuesFromCell(
          v1,
          v2,
          grid[i][possiblePairResult.column],
        );
        grid[i][possiblePairResult.column] = removePairValues.cell;
        valuesEliminated =
          valuesEliminated || removePairValues.valuesEliminated;
      }
    }
    return valuesEliminated;
  }

  private eliminateSquares(
    squarePositionsMap: CellPositionMap,
    possiblePairResult: PossiblePairResult,
    v1: number,
    v2: number,
    grid: SudokuGrid,
  ): boolean {
    let valuesEliminated = false;
    if (possiblePairResult.square) {
      squarePositionsMap
        .getForSquareIndex(possiblePairResult.square)
        .forEach((cellPosition) => {
          const removePairValues = this.removePairValuesFromCell(
            v1,
            v2,
            grid[cellPosition.x][cellPosition.y],
          );
          grid[cellPosition.x][cellPosition.y] = removePairValues.cell;
          valuesEliminated =
            valuesEliminated || removePairValues.valuesEliminated;
        });
    }
    return valuesEliminated;
  }

  private removePairValuesFromCell(
    v1: number,
    v2: number,
    cell: SudokuGridCell,
  ): { cell: SudokuGridCell; valuesEliminated: boolean } {
    if (isArray(cell)) {
      if (!this.containsOnlySearchedPair(v1, v2, cell)) {
        const lengthBeforeFilter = cell.length;
        const filteredCell = cell.filter((v) => v !== v1 && v !== v2);
        return {
          cell: filteredCell,
          valuesEliminated: lengthBeforeFilter !== filteredCell.length,
        };
      }
    }
    return { cell, valuesEliminated: false };
  }
}
