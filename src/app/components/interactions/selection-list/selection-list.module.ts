import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/icon/icon.module";
import { TranslateModule } from "@ngx-translate/core";
import { SelectionListComponent } from "./selection-list.component";

@NgModule({
  declarations: [SelectionListComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [SelectionListComponent],
})
export class SelectionListModule {}
