import {
  APP_INITIALIZER,
  enableProdMode,
  importProvidersFrom,
} from "@angular/core";

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { appStoreImports } from "@app/app.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { TranslateHttpLoaderFactory } from "@app/core/translate/translate-loader-factory";
import { appInitializer } from "@app/state/app-initialization.service";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

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
