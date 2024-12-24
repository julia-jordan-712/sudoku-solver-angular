import { Component, inject } from "@angular/core";
import { DevFunctionsSelectors } from "@app/components/dev-functions/state/dev-functions.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-dev-functions",
  templateUrl: "./dev-functions.component.html",
  styleUrl: "./dev-functions.component.scss",
})
export class DevFunctionsComponent {
  private store = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    DevFunctionsSelectors.selectIsDevelopment,
  );
}
