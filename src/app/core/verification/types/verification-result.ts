import { VerificationDuplicates } from '@app/core/verification/types/verification-duplicates';
import { I18nKey } from '@app/shared/types/i18n-key';
import { Nullable } from '@app/shared/types/nullable';
import { Objects } from '@app/shared/util/objects';

export class VerificationResult {
  public static createValid(): VerificationResult {
    return new VerificationResult(new Set());
  }

  public static createFromErrors(errors: I18nKey[]): VerificationResult {
    const result: VerificationResult = new VerificationResult(new Set());
    errors.forEach((e) => result.addError(e));
    return result;
  }

  private duplicates: Nullable<VerificationDuplicates>;

  private constructor(private errors: Set<I18nKey>) {}

  isValid(): boolean {
    return (
      this.errors.size === 0 &&
      (!this.duplicates || Object.keys(this.duplicates).length === 0)
    );
  }

  addError(error: I18nKey): void {
    this.errors.add(error);
  }

  getErrors(): readonly I18nKey[] {
    return Array.from(this.errors.values());
  }

  addDuplicates(duplicates: VerificationDuplicates): void {
    this.duplicates = Objects.mergeArrayIndex(
      this.duplicates ?? {},
      duplicates
    );
  }

  hasTrackedDuplicates(): boolean {
    return this.errors.size !== 0 && this.duplicates != undefined;
  }

  getDuplicatesPerValue(): VerificationDuplicates {
    return this.duplicates ?? {};
  }
}
