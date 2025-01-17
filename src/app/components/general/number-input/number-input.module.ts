import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IconModule } from "@app/components/general/icon/icon.module";
import { NumberInputComponent } from "@app/components/general/number-input/number-input.component";

@NgModule({
  declarations: [NumberInputComponent],
  imports: [CommonModule, IconModule, FormsModule],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
