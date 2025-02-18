import { I18nKey } from "@app/types/i18n-key";
import { ObjectWithId } from "@app/types/object-with-id";
import { Observable } from "rxjs";

export interface SingleSelectionInputOption<T> extends ObjectWithId {
  name?: string;
  name$?: Observable<string>;
  i18nKey?: I18nKey;
  data?: T;
}
