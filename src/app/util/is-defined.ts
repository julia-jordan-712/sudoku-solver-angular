import { Nullable } from "@app/types/nullable";

export function isDefined<T>(value: Nullable<T>): value is T {
  return value !== null && value !== undefined;
}
