import { Component, Input } from "@angular/core";
import { I18nKey } from "@app/types/i18n-key";
import { Nullable } from "@app/types/nullable";
import { ObjectWithId } from "@app/types/object-with-id";

@Component({
  selector: "app-hint-list",
  templateUrl: "./hint-list.component.html",
  styleUrl: "./hint-list.component.scss",
})
export class HintListComponent {
  @Input()
  title: Nullable<string>;

  @Input({ required: true })
  hints: Hint[];
}

export interface Hint extends ObjectWithId {
  hint: I18nKey;
}
