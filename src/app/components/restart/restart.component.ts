import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AppActions } from "@app/state/app-state";
import { Store } from "@ngrx/store";
import { IconComponent } from "../general/icon/icon.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-restart",
  templateUrl: "./restart.component.html",
  styleUrl: "./restart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent, TranslateModule],
})
export class RestartComponent {
  private store: Store = inject(Store);

  protected clearState(): void {
    this.store.dispatch(AppActions.reinitialize());
  }
}
