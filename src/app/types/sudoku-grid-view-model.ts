import { ClipboardElement } from "@app/components/dev-functions/services/clipboard.service";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { CellPosition } from "@app/types/cell-position";
import { Nullable } from "@app/types/nullable";
import { SudokuGridCell } from "@app/types/sudoku-grid";
import { isArray } from "@app/util/is-array";

export interface SudokuGridViewModelBranchInfo {
  id: string;
  isCurrent: boolean;
}

export class SudokuGridViewModel implements ClipboardElement {
  constructor(
    readonly id: string,
    readonly rows: SudokuGridRowViewModel[],
    readonly data: {
      readonly branchInfo: SudokuGridViewModelBranchInfo;
      readonly verificationResult: Nullable<VerificationResult>;
      readonly highlightChangedCells: boolean;
    },
  ) {}

  toClipboardString(): string {
    return `[\n${this.rows.map((row) => row.toClipboardString()).join(",\n")}\n]`;
  }
}

export class SudokuGridRowViewModel implements ClipboardElement {
  constructor(
    readonly id: string,
    readonly cells: SudokuGridCellViewModel[],
    readonly data: {
      readonly branchInfo: SudokuGridViewModelBranchInfo;
      readonly verificationResult: Nullable<VerificationResult>;
      readonly highlightChangedCells: boolean;
    },
  ) {}

  toClipboardString(): string {
    return `[${this.cells.map((cell) => cell.toClipboardString()).join(", ")}]`;
  }
}

export class SudokuGridCellViewModel implements ClipboardElement {
  constructor(
    readonly id: string,
    readonly cell: SudokuGridCell,
    readonly data: {
      readonly cellPosition: CellPosition;
      readonly branchInfo: SudokuGridViewModelBranchInfo;
      readonly highlightChangedCells: boolean;
      readonly maxValue: number;
      readonly verificationResult: Nullable<VerificationResult>;
      readonly widthAndHeight: number;
    },
    readonly previous?: SudokuGridCell,
  ) {}

  isDuplicate(): boolean {
    return Object.values(
      this.data.verificationResult?.getDuplicatesPerValue() ?? {},
    )
      .flat()
      .some((duplicatePosition) =>
        duplicatePosition.equals(this.data.cellPosition),
      );
  }

  toClipboardString(): string {
    return isArray(this.cell)
      ? `[${this.cell.map((v) => (v != null ? v : "null")).join(", ")}]`
      : this.cell != null
        ? this.cell.toString()
        : "null";
  }
}
