import { inject, Injectable } from "@angular/core";
import { Logger } from "@app/core/log/logger";
import { StateInBrowserStorageService } from "@app/state/state-in-browser-storage.service";
import { catchError, from, Observable, of, take } from "rxjs";

export function appInitializer(): () => Observable<unknown> {
  const initializer: AppInitializationService = inject(
    AppInitializationService,
  );
  return (): Observable<unknown> => initializer.initialize();
}

@Injectable({
  providedIn: "root",
})
export class AppInitializationService {
  private readonly logger = new Logger(AppInitializationService.name);

  private stateInBrowser: StateInBrowserStorageService = inject(
    StateInBrowserStorageService,
  );

  initialize(): Observable<unknown> {
    return this.initApplication().pipe(
      take(1),
      catchError((error) => {
        this.logger.logError("Failed to initialize", error);
        return of(false);
      }),
    );
  }

  private initApplication(): Observable<void> {
    return from(this.stateInBrowser.setStateFromBrowser());
  }
}
