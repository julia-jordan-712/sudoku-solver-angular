import { inject, Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Logger } from "@app/core/log/logger";
import { AppActions, AppState } from "@app/state/app-state";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateInBrowserStorageService {
  private readonly STATE_STORAGE_KEY = "suso_app_state";
  private readonly LANGUAGE_STORAGE_KEY = "suso_app_lang";

  private log: Logger = new Logger(StateInBrowserStorageService.name);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private store: Store = inject(Store);
  private translate: TranslateService = inject(TranslateService);

  setStateFromBrowser(): Promise<void> {
    const state = this.getAndRemoveItem<AppState>(this.STATE_STORAGE_KEY);
    if (state) {
      this.store.dispatch(AppActions.init({ state: state }));
      this.log.logInfo("State set from browser storage");
    } else {
      this.log.logInfo("Could not read state from browser storage");
    }

    const language = this.getAndRemoveItem<string>(this.LANGUAGE_STORAGE_KEY);
    if (language) {
      this.translate.use(language);
      this.log.logInfo("Language set from browser storage");
    } else {
      this.log.logInfo("Could not read language from browser storage");
    }

    return Promise.resolve();
  }

  storeStateInBrowser(): void {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.pipe(take(1)).subscribe((state) => {
      this.log.logInfo("Storing state in browser");
      this.setItem(this.STATE_STORAGE_KEY, state);
    });
    this.setItem(this.LANGUAGE_STORAGE_KEY, this.translate.currentLang);
  }

  private getAndRemoveItem<T extends object | string>(key: string): T | null {
    const fromStorage = this.sanitizer.sanitize(
      SecurityContext.NONE,
      localStorage.getItem(key),
    );
    localStorage.removeItem(key);
    if (fromStorage) {
      return JSON.parse(fromStorage);
    } else {
      return null;
    }
  }

  private setItem<T extends object | string>(key: string, obj: T): void {
    localStorage.setItem(
      key,
      JSON.stringify(this.sanitizer.sanitize(SecurityContext.NONE, obj)),
    );
  }
}
