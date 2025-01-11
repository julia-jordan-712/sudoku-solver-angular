import { Component } from "@angular/core";
import { NumberInputComponent } from "@app/components/shared/number-input/number-input.component";

@Component({
  selector: "app-number-input",
  template: `{{ value }}`,
})
export class NumberInputTestComponent extends NumberInputComponent {}
