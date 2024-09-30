import { CyChainable } from "@cypress/types/cy-chainable";
import { MountResponse } from "cypress/angular";

export type CyComponentInput<T> = Partial<{ [P in keyof T]: T[P] }>;

export class CyComponent<T> {
  constructor(public readonly mountResponse: CyChainable<MountResponse<T>>) {
    console.log("constructor", mountResponse);
  }

  setInput(componentInput: CyComponentInput<T>): void {
    this.mountResponse.then(async (response) => {
      Object.keys(componentInput).forEach((key) => {
        const componentKey = key as keyof T;
        const componentValue = componentInput[componentKey];
        if (componentValue) {
          response.component[componentKey] = componentValue;
        }
      });
      response.fixture.changeDetectorRef.markForCheck();
      response.fixture.detectChanges();
      await response.fixture.whenStable();
    });
  }
}
