import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nKeyPipe } from "@app/pipes/translate-i18n-key/i18n-key.pipe";

@NgModule({
  declarations: [I18nKeyPipe],
  imports: [CommonModule],
  exports: [I18nKeyPipe],
})
export class TranslateI18nKeyModule {}
