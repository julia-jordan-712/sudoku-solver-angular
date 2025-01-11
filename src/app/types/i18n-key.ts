/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface I18nKey {
  key: string;
  params?: { [parameterName: string]: string | number | boolean };
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
          sameParameters = key1.params[paramKey] === key2.params[paramKey];
        }
        return sameParameters;
      }
    }
  }
  return false;
}
