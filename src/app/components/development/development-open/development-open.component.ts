import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DevelopmentActions } from "@app/components/development/state/development.actions";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-development-open",
  templateUrl: "./development-open.component.html",
  styleUrl: "./development-open.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule],
})
export class DevelopmentOpenComponent {
  private store = inject(Store);

  protected show = !environment.production;

  protected showDevFunctions(): void {
    this.store.dispatch(
      DevelopmentActions.showDevelopmentFunctions({ show: true }),
    );
  }
}
