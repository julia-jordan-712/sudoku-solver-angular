import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateI18nKeyModule } from "@app/pipes/translate-i18n-key/translate-i18n-key.module";
import { HintListComponent } from "./hint-list.component";

@NgModule({
  declarations: [HintListComponent],
  imports: [CommonModule, TranslateI18nKeyModule],
  exports: [HintListComponent],
})
export class HintListModule {}
