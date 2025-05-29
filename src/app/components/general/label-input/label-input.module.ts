import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { LabelInputComponent } from "./label-input.component";

@NgModule({
  imports: [CommonModule, IconModule, LabelInputComponent],
  exports: [LabelInputComponent],
})
export class LabelInputModule {}
