import { Component, inject } from "@angular/core";
import { DevFunctionActions } from "@app/components/development-functions/state/dev-functions.actions";
import { DevFunctionsSelectors } from "@app/components/development-functions/state/dev-functions.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-development-functions",
  templateUrl: "./development-functions.component.html",
  styleUrl: "./development-functions.component.scss",
})
export class DevelopmentFunctionsComponent {
  private store = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    DevFunctionsSelectors.selectIsDevelopment,
  );

  protected hideDevFunctions(): void {
    this.store.dispatch(DevFunctionActions.hide());
  }
}
