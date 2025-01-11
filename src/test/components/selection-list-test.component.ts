import { Component } from "@angular/core";
import { SelectionListComponent } from "@app/components/general/selection-list/selection-list.component";

@Component({
  selector: "app-selection-list",
  template: `{{ value }}`,
})
export class SelectionListTestComponent extends SelectionListComponent {}
