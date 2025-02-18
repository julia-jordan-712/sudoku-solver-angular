import { Component, inject, Input } from "@angular/core";
import { AppState } from "@app/state/app-state";
import { ViewActions } from "@app/state/view-state/view.actions";
import { ViewSelectors } from "@app/state/view-state/view.selectors";
import { I18nKey } from "@app/types/i18n-key";
import { Nullable } from "@app/types/nullable";
import { ObjectWithId } from "@app/types/object-with-id";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-hint-list",
  templateUrl: "./hint-list.component.html",
  styleUrl: "./hint-list.component.scss",
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
