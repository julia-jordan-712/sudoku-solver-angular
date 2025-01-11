import { VerificationDuplicates } from "@app/core/verification/types/verification-duplicates";
import { I18nKey, i18nKeyEqual } from "@app/types/i18n-key";
import { Nullable } from "@app/types/nullable";
import { Objects } from "@app/util/objects";

export class VerificationResult {
  public static createValid(): VerificationResult {
    return new VerificationResult([]);
  }

  public static createFromErrors(errors: I18nKey[]): VerificationResult {
    const result: VerificationResult = new VerificationResult([]);
    errors.forEach((e) => result.addError(e));
    return result;
  }

  private duplicates: Nullable<VerificationDuplicates>;

  private constructor(private errors: I18nKey[]) {}

  isValid(): boolean {
    return (
      this.errors.length === 0 &&
      (!this.duplicates || Object.keys(this.duplicates).length === 0)
    );
  }

  addError(error: I18nKey): void {
    if (this.errors.filter((e) => i18nKeyEqual(e, error)).length === 0) {
      this.errors.push(error);
    }
  }

  getErrors(): readonly I18nKey[] {
    return Array.from(this.errors.values());
  }

  addDuplicates(duplicates: VerificationDuplicates): void {
    this.duplicates = Objects.uniqueArrayIndex(
      Objects.mergeArrayIndex(this.duplicates ?? {}, duplicates),
      (a, b) => a.equals(b),
    );
  }

  // visible for testing
  hasTrackedDuplicates(): boolean {
    return (
      this.errors.length !== 0 &&
      this.duplicates != undefined &&
      Object.keys(this.duplicates).length > 0
    );
  }

  getDuplicatesPerValue(): VerificationDuplicates {
    return this.duplicates ?? {};
  }
}
