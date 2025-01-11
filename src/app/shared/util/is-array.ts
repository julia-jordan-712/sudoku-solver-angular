import { isDefined } from "@app/shared/util/is-defined";
import { Nullable } from "@app/types/nullable";

export function isArray<T>(value: Nullable<T | T[]>): value is T[] {
  return isDefined(value) && (value as T[]).length != undefined;
}

export function isNotArray<T>(value: Nullable<T | T[]>): value is T {
  return !isDefined(value) || (value as T[])?.length == undefined;
}
