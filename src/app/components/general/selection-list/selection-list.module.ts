import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LabelInputModule } from "@app/components/general/label-input/label-input.module";
import { SelectionListComponent } from "@app/components/general/selection-list/selection-list.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    LabelInputModule,
    TranslateModule,
    SelectionListComponent,
  ],
  exports: [SelectionListComponent],
})
export class SelectionListModule {}
