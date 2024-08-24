import {
  SolverBranch,
  SolverBranchUtil,
} from "@app/core/solver/types/solver-branch";
import {
  SudokuGrid,
  SudokuGridCell,
  SudokuGridRow,
} from "@app/shared/types/sudoku-grid";
import {
  SudokuGridCellViewModel,
  SudokuGridRowViewModel,
  SudokuGridViewModel,
} from "@app/shared/types/sudoku-grid-view-model";

export class SudokuGridViewModelConverter {
  public static createViewModelsFromGrids(
    branches: SolverBranch[],
    id = "",
  ): SudokuGridViewModel[] {
    const grids: SudokuGrid[] = branches
      .sort(SolverBranchUtil.sortingFunction)
      .map((branch) => branch.grid);
    return grids.map((grid, index) =>
      SudokuGridViewModelConverter.createViewModelFromGrid(grid, id, index),
    );
  }

  public static createViewModelFromGrid(
    grid: SudokuGrid,
    id = "",
    index = 0,
  ): SudokuGridViewModel {
    return new SudokuGridViewModel(
      `${id}-grid-${index}`,
      SudokuGridViewModelConverter.createViewModelsFromRows(grid, id),
    );
  }

  private static createViewModelsFromRows(
    rows: SudokuGridRow[],
    id = "",
  ): SudokuGridRowViewModel[] {
    return rows.map((row, index) =>
      SudokuGridViewModelConverter.createViewModelsFromRow(row, id, index),
    );
  }

  private static createViewModelsFromRow(
    row: SudokuGridRow,
    id = "",
    index = 0,
  ): SudokuGridRowViewModel {
    return new SudokuGridRowViewModel(
      `${id}-row-${index}`,
      SudokuGridViewModelConverter.createViewModelsFromCells(row, id, index),
    );
  }

  private static createViewModelsFromCells(
    cells: SudokuGridCell[],
    id = "",
    rowIndex = 0,
  ): SudokuGridCellViewModel[] {
    const maxValue = cells.length;
    const sqrt = Math.ceil(Math.sqrt(maxValue));
    const size = Math.max(32, 16 + 10 * sqrt);

    return cells.map((cell, index) =>
      SudokuGridViewModelConverter.createViewModelsFromCell(
        cell,
        maxValue,
        size,
        rowIndex,
        index,
        id,
      ),
    );
  }

  private static createViewModelsFromCell(
    cell: SudokuGridCell,
    maxValue: number,
    size: number,
    rowIndex = 0,
    columnIndex = 0,
    id = "",
  ): SudokuGridCellViewModel {
    return new SudokuGridCellViewModel(
      `${id}-cell-${rowIndex}-${columnIndex}`,
      cell,
      maxValue,
      size,
    );
  }

  public static createGridFromViewModel(
    viewModel: SudokuGridViewModel,
  ): SudokuGrid {
    return SudokuGridViewModelConverter.createRowsFromViewModels(
      viewModel.rows,
    );
  }

  private static createRowsFromViewModels(
    viewModels: SudokuGridRowViewModel[],
  ): SudokuGridRow[] {
    return viewModels.map((viewModel) =>
      SudokuGridViewModelConverter.createRowFromViewModel(viewModel),
    );
  }

  public static createRowFromViewModel(
    viewModel: SudokuGridRowViewModel,
  ): SudokuGridRow {
    return SudokuGridViewModelConverter.createCellsFromViewModels(
      viewModel.cells,
    );
  }

  private static createCellsFromViewModels(
    viewModels: SudokuGridCellViewModel[],
  ): SudokuGridCell[] {
    return viewModels.map((viewModel) =>
      SudokuGridViewModelConverter.createCellFromViewModel(viewModel),
    );
  }

  private static createCellFromViewModel(
    viewModel: SudokuGridCellViewModel,
  ): SudokuGridCell {
    return viewModel.cell;
  }
}
