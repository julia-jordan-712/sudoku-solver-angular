/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface I18nKey {
  key: string;
  params?: { [parameterName: string]: string | number | boolean | I18nKey };
}

export function isI18nKey(key: any): key is I18nKey {
  return !!(key as I18nKey)?.key;
}

export function i18nKeyEqual(key1: I18nKey, key2: I18nKey): boolean {
  if (key1.key === key2.key) {
    if (key1.params == undefined && key2.params == undefined) {
      return true;
    }
    if (key1.params != undefined && key2.params != undefined) {
      if (Object.keys(key1.params).length === Object.keys(key2.params).length) {
        let sameParameters = true;
        const paramKeys: string[] = Object.keys(key1.params);
        for (let i = 0; i < paramKeys.length && sameParameters; i++) {
          const paramKey: string = paramKeys[i]!;
          const param1 = key1.params[paramKey];
          const param2 = key2.params[paramKey];
          if (isI18nKey(param1) && isI18nKey(param2)) {
            sameParameters = i18nKeyEqual(param1, param2);
          } else if (!isI18nKey(param1) && !isI18nKey(param2)) {
            sameParameters = param1 === param2;
          } else {
            sameParameters = false;
            break;
          }
        }
        return sameParameters;
      }
    }
  }
  return false;
}
