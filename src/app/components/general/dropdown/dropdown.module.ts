import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "@app/components/general/dropdown/dropdown.component";
import { LabelInputModule } from "@app/components/general/label-input/label-input.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LabelInputModule,
    TranslateModule,
    DropdownComponent,
  ],
  exports: [DropdownComponent],
})
export class DropdownModule {}
