import { Nullable } from "@app/shared/types/nullable";
import { isDefined } from "@app/shared/util/is-defined";

export function isArray<T>(value: Nullable<T | T[]>): value is T[] {
  return isDefined(value) && (value as T[]).length != undefined;
}

export function isNotArray<T>(value: Nullable<T | T[]>): value is T {
  return !isDefined(value) || (value as T[])?.length == undefined;
}
