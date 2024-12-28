import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { SectionModule } from "@app/components/section/section.module";
import { TranslateModule } from "@ngx-translate/core";
import { SudokuPuzzleSolverSwitchComponent } from "./sudoku-puzzle-solver-switch.component";

@NgModule({
  declarations: [SudokuPuzzleSolverSwitchComponent],
  imports: [CommonModule, IconModule, SectionModule, TranslateModule],
  exports: [SudokuPuzzleSolverSwitchComponent],
})
export class SudokuPuzzleSolverSwitchModule {}
