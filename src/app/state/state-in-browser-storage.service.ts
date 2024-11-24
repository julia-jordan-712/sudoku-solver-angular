import { inject, Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Logger } from "@app/core/log/logger";
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

  storeStateInBrowser(): void {
    this.store.pipe(take(1)).subscribe((state) => {
      this.log.logInfo("Storing state in browser");
      this.setItem(this.STORAGE_KEY, state);
    });
  }

  private setItem<T extends object>(key: string, obj: T): void {
    localStorage.setItem(
      key,
      JSON.stringify(this.sanitizer.sanitize(SecurityContext.NONE, obj)),
    );
  }
}
