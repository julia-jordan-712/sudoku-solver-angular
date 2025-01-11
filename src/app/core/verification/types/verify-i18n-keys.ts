import { I18nKey } from "@app/types/i18n-key";

export class VerifyI18nKey {
  private static readonly VERIFY_ERROR: string = "VERIFY.ERROR";
  private static readonly VERIFY_UNSUPPORTED: string = "VERIFY.UNSUPPORTED";

  public static readonly ERROR_DUPLICATE_ELEMENTS: I18nKey = {
    key: `${VerifyI18nKey.VERIFY_ERROR}.DUPLICATE_ELEMENTS`,
  };
  public static readonly ERROR_EMPTY: I18nKey = {
    key: `${VerifyI18nKey.VERIFY_ERROR}.EMPTY`,
  };
  public static readonly ERROR_EMPTY_CELL: I18nKey = {
    key: `${VerifyI18nKey.VERIFY_ERROR}.EMPTY_CELL`,
  };
  public static readonly ERROR_INVALID_NUMBERS = (limit: number): I18nKey => {
    return {
      key: `${VerifyI18nKey.VERIFY_ERROR}.INVALID_NUMBERS`,
      params: { limit: limit },
    };
  };
  public static readonly ERROR_NOT_A_SQUARE: I18nKey = {
    key: `${VerifyI18nKey.VERIFY_ERROR}.NOT_A_SQUARE`,
  };
  public static readonly UNSUPPORTED_NOT_QUADRATIC: I18nKey = {
    key: `${VerifyI18nKey.VERIFY_UNSUPPORTED}.NOT_QUADRATIC`,
  };
}
