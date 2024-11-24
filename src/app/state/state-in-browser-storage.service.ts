import { inject, Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Logger } from "@app/core/log/logger";
import { AppActions, AppState } from "@app/state/app-state";
import { Store } from "@ngrx/store";
import { take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StateInBrowserStorageService {
  private readonly STORAGE_KEY = "suso_app_state";

  private log: Logger = new Logger(StateInBrowserStorageService.name);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private store: Store = inject(Store);

  setStateFromBrowser(): Promise<void> {
    const state = this.getItem<AppState>(this.STORAGE_KEY);
    this.removeItem(this.STORAGE_KEY);
    if (state) {
      this.store.dispatch(AppActions.init({ state: state }));
      this.log.logInfo("State set from browser storage");
      return Promise.resolve();
    } else {
      this.log.logInfo("Could not read state from browser storage");
      return Promise.resolve();
    }
  }

  storeStateInBrowser(): void {
    this.store.pipe(take(1)).subscribe((state) => {
      this.log.logInfo("Storing state in browser");
      this.setItem(this.STORAGE_KEY, state);
    });
  }

  private getItem<T extends object>(key: string): T | null {
    const fromStorage = this.sanitizer.sanitize(
      SecurityContext.NONE,
      localStorage.getItem(key),
    );
    if (fromStorage) {
      return JSON.parse(fromStorage);
    } else {
      return null;
    }
  }

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  private setItem<T extends object>(key: string, obj: T): void {
    localStorage.setItem(
      key,
      JSON.stringify(this.sanitizer.sanitize(SecurityContext.NONE, obj)),
    );
  }
}
