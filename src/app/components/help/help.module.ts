import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { HelpComponent } from "./help.component";

@NgModule({
  imports: [CommonModule, IconModule, TranslateModule, HelpComponent],
  exports: [HelpComponent],
})
export class HelpModule {}
