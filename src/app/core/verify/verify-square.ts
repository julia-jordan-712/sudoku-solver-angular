import { VerifyI18nKey } from "@app/core/verify/types/verify-i18n-keys";

export class VerifySquare {

  constructor(private candidate: number[][]) {}

  verifyAndGetSize(): number {
    const length: number = this.verifyIsSquare(this.candidate);
    this.verifyConsistsOfSquares(length);
    return length;
  }

  private verifyIsSquare(area: number[][]): number {
    const length: number = area.length;
    if (length <= 0) {
      throw new Error(`${VerifyI18nKey.VERIFY_ERROR}.EMPTY`);
    }
    area.forEach((array: number[]) => {
      if (array.length !== length) {
        throw new Error(`${VerifyI18nKey.VERIFY_ERROR}.NOT_A_SQUARE`);
      }
    });
    return length;
  }

  private verifyConsistsOfSquares(length: number): void {
    if (length === 1 || !Number.isInteger(Math.sqrt(length))) {
      throw new Error(`${VerifyI18nKey.VERIFY_UNSUPPORTED}.NOT_QUADRATIC`);
    }
  }
}
