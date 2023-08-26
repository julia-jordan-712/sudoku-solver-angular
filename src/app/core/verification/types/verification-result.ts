import { I18nKey } from '@app/shared/types/i18n-key';

export class VerificationResult {
  public static createValid(): VerificationResult {
    return new VerificationResult(new Set());
  }
  public static createFromErrors(errors: I18nKey[]): VerificationResult {
    const result: VerificationResult = new VerificationResult(new Set());
    errors.forEach((e) => result.addError(e));
    return result;
  }

  private constructor(private errors: Set<I18nKey>) {}

  isValid(): boolean {
    return this.errors.size === 0;
  }

  addError(error: I18nKey): void {
    this.errors.add(error);
  }

  getErrors(): readonly I18nKey[] {
    return Array.from(this.errors.values());
  }
}
