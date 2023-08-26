import { VerifyI18nKey } from "@app/core/verify/types/verify-i18n-keys";

export class VerifyUniqueness {
  constructor(private candidate: number[][], private size: number) {}

  verify(): boolean {
    this.verifyRowsAndColumns(this.candidate, this.size);
    return true;
  }

  private verifyRowsAndColumns(area: number[][], size: number): void {
    let rows: Set<number> = new Set();
    let columns: Set<number> = new Set();
    for (let i: number = 0; i < size; i++) {
      rows.clear();
      columns.clear();
      for (let j: number = 0; j < size; j++) {
        rows.add(area[i][j]);
        columns.add(area[j][i]);
      }
      this.verifyUniqueness(rows, size);
      this.verifyUniqueness(columns, size);
    }
  }

  private verifyUniqueness(
    elements: Set<number>,
    numberOfElements: number
  ): void {
    if (elements.size !== numberOfElements) {
      throw new Error(`${VerifyI18nKey.VERIFY_ERROR}.DUPLICATE_ELEMENTS`);
    }
  }
}
