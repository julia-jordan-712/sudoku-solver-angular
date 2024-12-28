import { Component, inject } from "@angular/core";
import { AppActions } from "@app/state/app-state";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-clear-state",
  templateUrl: "./clear-state.component.html",
  styleUrl: "./clear-state.component.scss",
})
export class ClearStateComponent {
  private store: Store = inject(Store);

  protected clearState(): void {
    this.store.dispatch(AppActions.reinitialize());
  }
}
