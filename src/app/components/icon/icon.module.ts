import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { IconComponent } from "./icon.component";
import { SvgIconComponent } from "./svg-icon/svg-icon.component";

@NgModule({
  declarations: [IconComponent, SvgIconComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IconComponent],
})
export class IconModule {}
