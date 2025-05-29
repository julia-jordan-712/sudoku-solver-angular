import {
  enableProdMode,
  APP_INITIALIZER,
  ModuleWithProviders,
  importProvidersFrom,
} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "src/environments/environment";
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HttpClient,
} from "@angular/common/http";
import { appInitializer } from "@app/state/app-initialization.service";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { AppRoutingModule } from "@app/app-routing.module";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoaderFactory } from "@app/core/translate/translate-loader-factory";
import { appStoreImports } from "./app/app.module";
import { StoreRootModule, StoreModule } from "@ngrx/store";
import { reducer, metaReducers } from "@app/state/app-state";
import { EffectsModule } from "@ngrx/effects";
import { DevelopmentEffects } from "@app/components/development/state/development.effects";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      BrowserModule,
      TranslateModule.forRoot({
        defaultLanguage: "en",
        loader: {
          provide: TranslateLoader,
          useFactory: TranslateHttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      ...appStoreImports,
      environment.production ? [] : StoreDevtoolsModule.instrument(),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true },
    ...SOLVER_PROVIDERS,
    provideAnimations(),
  ],
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
