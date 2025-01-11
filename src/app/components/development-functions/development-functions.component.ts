import { Component, inject } from "@angular/core";
import { DevelopmentActions } from "@app/components/development-functions/state/development.actions";
import { DevelopmentSelectors } from "@app/components/development-functions/state/development.selectors";
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
    DevelopmentSelectors.selectIsDevelopment,
  );

  protected hideDevFunctions(): void {
    this.store.dispatch(DevelopmentActions.hide());
  }
}
