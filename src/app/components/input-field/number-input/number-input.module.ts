import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NumberInputComponent } from "./number-input.component";

@NgModule({
  declarations: [NumberInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [NumberInputComponent],
})
export class NumberInputModule {}
