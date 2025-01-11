import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SectionComponent } from "@app/components/general/section/section.component";

@NgModule({
  declarations: [SectionComponent],
  imports: [CommonModule],
  exports: [SectionComponent],
})
export class SectionModule {}
