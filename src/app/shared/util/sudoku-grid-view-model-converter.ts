import { SolverBranch } from "@app/core/solver/types/solver-branch";
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
import { isDefined } from "@app/shared/util/is-defined";

export class SudokuGridViewModelConverter {
  public static createViewModelsFromBranches(
    branches: SolverBranch[],
    id: string,
  ): SudokuGridViewModel[] {
    return branches
      .sort((a, b) => b.compareTo(a))
      .map((branch) =>
        SudokuGridViewModelConverter.createViewModelFromGrid(branch.grid, id, {
          id: branch.getId(),
          isCurrent: branch.isCurrentBranch(),
        }),
      );
  }

  public static createViewModelFromGrid(
    grid: SudokuGrid,
    id: string,
    branchInfo?: SudokuGridViewModel["branchInfo"],
  ): SudokuGridViewModel {
    const branchId: string | undefined = branchInfo?.isCurrent
      ? "CURRENT"
      : branchInfo?.id;
    const viewModelId: string = [id, branchId].filter(isDefined).join("_");
    return new SudokuGridViewModel(
      viewModelId,
      SudokuGridViewModelConverter.createViewModelsFromRows(grid, id),
      branchInfo,
    );
  }

  private static createViewModelsFromRows(
    rows: SudokuGridRow[],
    id: string,
  ): SudokuGridRowViewModel[] {
    return rows.map((row, index) =>
      SudokuGridViewModelConverter.createViewModelsFromRow(row, id, index),
    );
  }

  private static createViewModelsFromRow(
    row: SudokuGridRow,
    id: string,
    index: number,
  ): SudokuGridRowViewModel {
    return new SudokuGridRowViewModel(
      `${id}_row-${index}`,
      SudokuGridViewModelConverter.createViewModelsFromCells(row, id, index),
    );
  }

  private static createViewModelsFromCells(
    cells: SudokuGridCell[],
    id: string,
    rowIndex: number,
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
    rowIndex: number,
    columnIndex: number,
    id: string,
  ): SudokuGridCellViewModel {
    return new SudokuGridCellViewModel(
      `${id}_cell-${rowIndex}-${columnIndex}`,
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
