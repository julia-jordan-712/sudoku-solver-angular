import { Component, inject } from "@angular/core";
import { DevelopmentActions } from "./state/development.actions";
import { DevelopmentSelectors } from "./state/development.selectors";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-development",
  templateUrl: "./development.component.html",
  styleUrl: "./development.component.scss",
})
export class DevelopmentComponent {
  private store = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    DevelopmentSelectors.selectIsDevelopment,
  );

  protected hideDevFunctions(): void {
    this.store.dispatch(DevelopmentActions.hide());
  }
}
