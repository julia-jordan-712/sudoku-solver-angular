import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SectionComponent } from "@app/components/general/section/section.component";

@NgModule({
    imports: [CommonModule, SectionComponent],
    exports: [SectionComponent],
})
export class SectionModule {}
