import { registerLocaleData } from "@angular/common";
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "@app/app-routing.module";
import { AppComponent } from "@app/app.component";
import { DevelopmentEffects } from "@app/components/development-functions/state/development.effects";
import { MainModule } from "@app/components/main/main.module";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { TranslateHttpLoaderFactory } from "@app/core/translate/translate-loader-factory";
import { appInitializer } from "@app/state/app-initialization.service";
import { metaReducers, reducer } from "@app/state/app-state";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule, StoreRootModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

registerLocaleData(localeDe);

export const appStoreImports: ModuleWithProviders<StoreRootModule>[] = [
  StoreModule.forRoot(reducer, { metaReducers }),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([DevelopmentEffects]),
  EffectsModule.forFeature([SudokuPuzzleEffects]),
  EffectsModule.forFeature([SudokuSolverEffects]),
];

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
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
