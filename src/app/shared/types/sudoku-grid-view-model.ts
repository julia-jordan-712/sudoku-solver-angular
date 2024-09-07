import { VerificationResult } from "@app/core/verification/types/verification-result";
import { CellPosition } from "@app/shared/types/cell-position";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGridCell } from "@app/shared/types/sudoku-grid";
import { ClipboardElement } from "@app/shared/util/clipboard-service";
import { isArray } from "@app/shared/util/is-array";

export interface SudokuGridViewModelBranchInfo {
  id: string;
  isCurrent: boolean;
}

export class SudokuGridViewModel implements ClipboardElement {
  constructor(
    readonly id: string,
    readonly rows: SudokuGridRowViewModel[],
    readonly branchInfo: SudokuGridViewModelBranchInfo,
    readonly verificationResult: Nullable<VerificationResult>,
  ) {}

  toClipboardString(): string {
    return `[\n${this.rows.map((row) => row.toClipboardString()).join(",\n")}\n]`;
  }
}

export class SudokuGridRowViewModel implements ClipboardElement {
  constructor(
    readonly id: string,
    readonly cells: SudokuGridCellViewModel[],
    readonly branchInfo: SudokuGridViewModelBranchInfo,
    readonly verificationResult: Nullable<VerificationResult>,
  ) {}

  toClipboardString(): string {
    return `[${this.cells.map((cell) => cell.toClipboardString()).join(", ")}]`;
  }
}

export class SudokuGridCellViewModel implements ClipboardElement {
  constructor(
    readonly id: string,
    readonly cell: SudokuGridCell,
    readonly cellPosition: CellPosition,
    readonly maxValue: number,
    readonly widthAndHeight: number,
    readonly branchInfo: SudokuGridViewModelBranchInfo,
    readonly verificationResult: Nullable<VerificationResult>,
  ) {}

  isDuplicate(): boolean {
    return Object.values(this.verificationResult?.getDuplicatesPerValue() ?? {})
      .flat()
      .some((duplicatePosition) => duplicatePosition.equals(this.cellPosition));
  }

  toClipboardString(): string {
    return isArray(this.cell)
      ? `[${this.cell.map((v) => (v != undefined ? v : "undefined")).join(", ")}]`
      : this.cell != undefined
        ? this.cell.toString()
        : "undefined";
  }
}
