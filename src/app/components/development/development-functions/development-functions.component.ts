import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DevelopmentActions } from "../state/development.actions";
import { DevelopmentSelectors } from "../state/development.selectors";

@Component({
  selector: "app-development-functions",
  templateUrl: "./development-functions.component.html",
  styleUrl: "./development-functions.component.scss",
})
export class DevelopmentFunctionsComponent {
  private store = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    DevelopmentSelectors.selectShowDevelopmentFunctions,
  );

  protected hideDevFunctions(): void {
    this.store.dispatch(
      DevelopmentActions.showDevelopmentFunctions({ show: false }),
    );
  }
}
