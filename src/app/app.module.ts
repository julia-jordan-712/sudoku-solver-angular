import { registerLocaleData } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MainModule } from "@app/components/main/main.module";
import { SUDOKU_SOLVER_STATE } from "@app/components/sudoku-solver/services/sudoku-solver-state";
import { SudokuSolverStateService } from "@app/components/sudoku-solver/services/sudoku-solver-state.service";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { TranslateHttpLoaderFactory } from "@app/core/translate/translate-loader-factory";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MainModule,
  ],
  providers: [
    ...SOLVER_PROVIDERS,
    SudokuSolverStateService,
    { provide: SUDOKU_SOLVER_STATE, useExisting: SudokuSolverStateService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
