import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LabelInputModule } from "@app/components/general/label-input/label-input.module";
import { NumberInputComponent } from "@app/components/general/number-input/number-input.component";

@NgModule({
  declarations: [NumberInputComponent],
  imports: [CommonModule, FormsModule, LabelInputModule],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
