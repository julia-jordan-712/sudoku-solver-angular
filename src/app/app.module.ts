import { registerLocaleData } from "@angular/common";
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { MainModule } from "@app/components/main/main.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { TranslateHttpLoaderFactory } from "@app/core/translate/translate-loader-factory";
import { metaReducers, reducers } from "@app/state";
import { appInitializer } from "@app/state/app-initialization.service";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule, StoreRootModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

registerLocaleData(localeDe);

export const appStoreImports: ModuleWithProviders<StoreRootModule>[] = [
  StoreModule.forRoot(reducers, { metaReducers }),
  EffectsModule.forRoot([]),
];

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
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
    MainModule,
    ...appStoreImports,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true },
    ...SOLVER_PROVIDERS,
  ],
})
export class AppModule {}
