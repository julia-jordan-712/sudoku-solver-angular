import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DropdownInputComponent } from "./dropdown-input.component";

@NgModule({
  declarations: [DropdownInputComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [DropdownInputComponent],
})
export class DropdownInputModule {}
