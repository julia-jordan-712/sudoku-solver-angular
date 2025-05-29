import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AppState } from "@app/state/app-state";
import { ViewActions } from "@app/state/view-state/view.actions";
import { Store } from "@ngrx/store";
import { IconComponent } from "../general/icon/icon.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-help",
    templateUrl: "./help.component.html",
    styleUrl: "./help.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent, TranslateModule],
})
export class HelpComponent {
  private store: Store<AppState> = inject(Store);

  protected showHelp(): void {
    this.store.dispatch(ViewActions.showHelp({ show: true }));
  }
}
