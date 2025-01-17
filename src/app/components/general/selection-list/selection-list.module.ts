import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { SelectionListComponent } from "@app/components/general/selection-list/selection-list.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [SelectionListComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [SelectionListComponent],
})
export class SelectionListModule {}
