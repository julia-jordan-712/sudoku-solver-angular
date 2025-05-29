import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LanguageSelectionComponent } from "@app/components/language-selection/language-selection.component";

@NgModule({
    imports: [CommonModule, LanguageSelectionComponent],
    exports: [LanguageSelectionComponent],
})
export class LanguageSelectionModule {}
