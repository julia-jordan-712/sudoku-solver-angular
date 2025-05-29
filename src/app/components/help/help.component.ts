import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AppState } from "@app/state/app-state";
import { ViewActions } from "@app/state/view-state/view.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-help",
  templateUrl: "./help.component.html",
  styleUrl: "./help.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent {
  private store: Store<AppState> = inject(Store);

  protected showHelp(): void {
    this.store.dispatch(ViewActions.showHelp({ show: true }));
  }
}
