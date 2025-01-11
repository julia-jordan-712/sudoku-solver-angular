import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/shared/icon/icon.module";
import { LanguageSelectionComponent } from "@app/components/language-selection/language-selection.component";

@NgModule({
  declarations: [LanguageSelectionComponent],
  imports: [CommonModule, IconModule],
  exports: [LanguageSelectionComponent],
})
export class LanguageSelectionModule {}
