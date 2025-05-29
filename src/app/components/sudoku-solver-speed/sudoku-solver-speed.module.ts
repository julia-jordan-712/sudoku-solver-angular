import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SudokuSolverSpeedComponent } from "@app/components/sudoku-solver-speed/sudoku-solver-speed.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    TranslateModule,
    SudokuSolverSpeedComponent,
  ],
  exports: [SudokuSolverSpeedComponent],
})
export class SudokuSolverSpeedModule {}
