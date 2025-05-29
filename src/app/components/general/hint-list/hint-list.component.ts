import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { AppState } from "@app/state/app-state";
import { ViewActions } from "@app/state/view-state/view.actions";
import { ViewSelectors } from "@app/state/view-state/view.selectors";
import { I18nKey } from "@app/types/i18n-key";
import { Nullable } from "@app/types/nullable";
import { ObjectWithId } from "@app/types/object-with-id";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SectionComponent } from "../section/section.component";
import { CloseButtonComponent } from "../close-button/close-button.component";
import { AsyncPipe } from "@angular/common";
import { I18nKeyPipe } from "@app/pipes/translate-i18n-key/i18n-key.pipe";

@Component({
  selector: "app-hint-list",
  templateUrl: "./hint-list.component.html",
  styleUrl: "./hint-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SectionComponent, CloseButtonComponent, AsyncPipe, I18nKeyPipe],
})
export class HintListComponent {
  private store: Store<AppState> = inject(Store);

  protected show$: Observable<boolean> = this.store.select(
    ViewSelectors.selectShowHelp,
  );

  @Input()
  title: Nullable<string>;

  @Input({ required: true })
  hints: Hint[];

  protected hide(): void {
    this.store.dispatch(ViewActions.showHelp({ show: false }));
  }
}

export interface Hint extends ObjectWithId {
  hint: I18nKey;
}
