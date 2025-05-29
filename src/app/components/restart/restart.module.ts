import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { RestartComponent } from "@app/components/restart/restart.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [CommonModule, IconModule, TranslateModule, RestartComponent],
  exports: [RestartComponent],
})
export class RestartModule {}
