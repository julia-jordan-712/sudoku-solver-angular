import { Component, inject } from "@angular/core";
import { AppActions } from "@app/state/app-state";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-restart",
  templateUrl: "./restart.component.html",
  styleUrl: "./restart.component.scss",
})
export class RestartComponent {
  private store: Store = inject(Store);

  protected clearState(): void {
    this.store.dispatch(AppActions.reinitialize());
  }
}
