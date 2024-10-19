import { CyChainable } from "@cypress/types/cy-chainable";
import { MountResponse } from "cypress/angular";

export type CyComponentInput<T> = Partial<{ [P in keyof T]: T[P] }>;

export class CyComponent<T> {
  constructor(private mountResponse: CyChainable<MountResponse<T>>) {}

  /**
   * Sets the provided `@Input()` in the component and triggers change detection.
   *
   * ATTENTION: If this is executed directly after `cy.mount`, it will not result
   * in a second input. Instead it will replace the original input provided in
   * `cy.mount`.
   * A workaround for this is to execute an expectation between `cy.mount` and
   * `setInput`.
   *
   * @param componentInput new input for the component
   */
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
