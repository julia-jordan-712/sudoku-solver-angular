import { isDefined } from "@app/shared/util/is-defined";

export class Assert {
  public static state(condition: boolean, msg?: string): asserts condition {
    if (!condition) {
      throw new AssertError(msg ?? "is not true");
    }
  }

  public static defined(obj: any, msg?: string): asserts obj {
    if (!isDefined(obj)) {
      throw new AssertError(msg ?? "is not defined");
    }
  }

  public static integer(value: number, msg?: string): asserts value {
    if (!Number.isInteger(value)) {
      throw new AssertError(msg ?? `${value} is not an integer`);
    }
  }
}

export class AssertError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AssertError";
  }
}
