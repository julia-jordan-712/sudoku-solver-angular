import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SmoothHeightDirective } from "./smooth-height.directive";
import { SmoothWidthDirective } from "./smooth-width.directive";

@NgModule({
  declarations: [SmoothHeightDirective, SmoothWidthDirective],
  imports: [CommonModule],
  exports: [SmoothHeightDirective, SmoothWidthDirective],
})
export class AnimationsModule {}
