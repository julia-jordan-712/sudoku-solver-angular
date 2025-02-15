import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { HelpComponent } from "./help.component";

@NgModule({
  declarations: [HelpComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [HelpComponent],
})
export class HelpModule {}
