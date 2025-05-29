import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CloseButtonModule } from "@app/components/general/close-button/close-button.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { TranslateI18nKeyModule } from "@app/pipes/translate-i18n-key/translate-i18n-key.module";
import { HintListComponent } from "./hint-list.component";

@NgModule({
    imports: [
        CommonModule,
        CloseButtonModule,
        SectionModule,
        TranslateI18nKeyModule,
        HintListComponent,
    ],
    exports: [HintListComponent],
})
export class HintListModule {}
