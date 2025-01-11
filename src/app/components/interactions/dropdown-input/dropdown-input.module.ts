import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownInputComponent } from "@app/components/interactions/dropdown-input/dropdown-input.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DropdownInputComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [DropdownInputComponent],
})
export class DropdownInputModule {}
