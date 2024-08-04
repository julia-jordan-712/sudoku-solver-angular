import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownInputComponent } from "./dropdown-input.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DropdownInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [DropdownInputComponent],
})
export class DropdownInputModule {}
