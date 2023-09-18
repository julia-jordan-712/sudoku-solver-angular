import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { SudokuSettingsModule } from "@app/components/sudoku-settings/sudoku-settings.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, SudokuSettingsModule, TranslateModule],
  exports: [MainComponent],
})
export class MainModule {}
