import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { ModuleWithProviders } from "@angular/core";
import { DevelopmentEffects } from "@app/components/development/state/development.effects";
import { SudokuPuzzleEffects } from "@app/components/sudoku-puzzle/state/sudoku-puzzle.effects";
import { SudokuSolverEffects } from "@app/components/sudoku-solver/state/sudoku-solver.effects";
import { metaReducers, reducer } from "@app/state/app-state";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule, StoreRootModule } from "@ngrx/store";

registerLocaleData(localeDe);

export const appStoreImports: ModuleWithProviders<StoreRootModule>[] = [
  StoreModule.forRoot(reducer, { metaReducers }),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([DevelopmentEffects]),
  EffectsModule.forFeature([SudokuPuzzleEffects]),
  EffectsModule.forFeature([SudokuSolverEffects]),
];
