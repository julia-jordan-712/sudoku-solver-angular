import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HelpComponent } from "./help.component";

@NgModule({
  declarations: [HelpComponent],
  imports: [CommonModule, TranslateModule],
  exports: [HelpComponent],
})
export class HelpModule {}
