import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { SectionModule } from "@app/components/section/section.module";
import { SudokuPuzzleSolverSwitchComponent } from "@app/components/sudoku-puzzle-solver-switch/sudoku-puzzle-solver-switch.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SudokuPuzzleSolverSwitchComponent],
  imports: [CommonModule, IconModule, SectionModule, TranslateModule],
  exports: [SudokuPuzzleSolverSwitchComponent],
})
export class SudokuPuzzleSolverSwitchModule {}
