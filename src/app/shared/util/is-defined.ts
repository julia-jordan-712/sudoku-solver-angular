import { Nullable } from "@app/shared/types/nullable";

export function isDefined<T>(value: Nullable<T>): value is T {
  return value !== null && value !== undefined;
}
