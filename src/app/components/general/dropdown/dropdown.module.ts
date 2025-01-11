import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "@app/components/general/dropdown/dropdown.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
