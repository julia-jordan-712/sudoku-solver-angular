import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { LabelInputComponent } from "./label-input.component";

@NgModule({
  declarations: [LabelInputComponent],
  imports: [CommonModule, IconModule],
  exports: [LabelInputComponent],
})
export class LabelInputModule {}
