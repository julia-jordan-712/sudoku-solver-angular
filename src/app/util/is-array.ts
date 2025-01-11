import { Nullable } from "@app/types/nullable";
import { isDefined } from "@app/util/is-defined";

export function isArray<T>(value: Nullable<T | T[]>): value is T[] {
  return isDefined(value) && (value as T[]).length != undefined;
}

export function isNotArray<T>(value: Nullable<T | T[]>): value is T {
  return !isDefined(value) || (value as T[])?.length == undefined;
}
