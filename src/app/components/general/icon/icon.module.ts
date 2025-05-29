import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconComponent } from "@app/components/general/icon/icon.component";

@NgModule({
  imports: [CommonModule, IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
