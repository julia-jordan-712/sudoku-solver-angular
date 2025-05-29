import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SmoothHeightDirective } from "@app/animations/smooth-height.directive";
import { SmoothWidthDirective } from "@app/animations/smooth-width.directive";

@NgModule({
    imports: [CommonModule, SmoothHeightDirective, SmoothWidthDirective],
    exports: [SmoothHeightDirective, SmoothWidthDirective],
})
export class AnimationsModule {}
