import { Index } from "@app/shared/types";
import { Nullable } from "@app/shared/types/nullable";
import { isDefined } from "@app/shared/util/is-defined";

export class Objects {
  public static isObject(obj: any): obj is object {
    return obj && typeof obj === "object" && !Array.isArray(obj);
  }

  public static arrayToArrayIndex<T, R>(
    array: T[],
    keyMapper: (e: T) => Nullable<string>,
    valueMapper: (e: T) => R,
  ): Index<R[]> {
    return array.reduce((index: Index<R[]>, element: T) => {
      const key = keyMapper(element);
      if (isDefined(key)) {
        index[key] = [...(index[key] ?? []), valueMapper(element)];
      }
      return index;
    }, {});
  }

  public static filterIndex<T>(
    index: Index<T>,
    predicate: (key: string, value: T) => boolean,
  ): Index<T> {
    const result: Index<T> = {};
    Object.entries(index).forEach(([key, value]) => {
      if (predicate(key, value)) {
        result[key] = value;
      }
    });
    return result;
  }

  public static mergeArrayIndex<T>(
    index1: Index<T[]>,
    index2: Index<T[]>,
  ): Index<T[]> {
    const result: Index<T[]> = { ...index1 };
    Object.entries(index2).forEach(([key, value]) => {
      result[key] = [...(result[key] ?? []), ...value];
    });
    return result;
  }

  public static mergeDeep<T>(...sources: readonly T[]): T {
    const result: T = {} as T;

    for (const source of sources) {
      for (const key in source) {
        if (result[key]) {
          // already handled, first match wins
          continue;
        }

        const sourceValue = source[key];
        if (Objects.isObject(sourceValue)) {
          Object.assign(result, {
            [key]: Objects.mergeDeep(
              ...sources.map((s) => s[key]).filter(isDefined),
            ),
          });
        } else {
          Object.assign(result, { [key]: sourceValue });
        }
      }
    }

    return result;
  }

  public static uniqueArrayIndex<T>(
    index: Index<T[]>,
    equals: (a: T, b: T) => boolean,
  ): Index<T[]> {
    const result: Index<T[]> = {};
    Object.entries(index).forEach(([key, values]) => {
      result[key] = Objects.uniqueArray(values, equals);
    });
    return result;
  }

  public static uniqueArray<T>(
    array: T[],
    equals: (a: T, b: T) => boolean,
  ): T[] {
    const result: T[] = [];
    array.forEach((value) => {
      if (!result.some((filtered: T) => equals(value, filtered))) {
        result.push(value);
      }
    });
    return result;
  }

  public static arraysEqualIgnoringOrder<T>(
    a1: Nullable<T[]>,
    a2: Nullable<T[]>,
  ): boolean {
    if (a1 && a2) {
      if (a1.length !== a2.length) {
        return false;
      }
      for (let i = 0; i < a1.length; i++) {
        const a1I: T = a1[i]!;
        if (!a2.includes(a1I)) {
          return false;
        }
      }
      return true;
    } else if (a1 && !a2) {
      return false;
    } else if (!a1 && a2) {
      return false;
    } else {
      return true;
    }
  }
}
