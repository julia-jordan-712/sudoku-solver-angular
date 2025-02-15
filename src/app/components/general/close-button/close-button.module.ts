import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { CloseButtonComponent } from "./close-button.component";

@NgModule({
  declarations: [CloseButtonComponent],
  imports: [CommonModule, IconModule],
  exports: [CloseButtonComponent],
})
export class CloseButtonModule {}
