import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@app/components/general/icon/icon.module";
import { CloseButtonComponent } from "./close-button.component";

@NgModule({
    imports: [CommonModule, IconModule, CloseButtonComponent],
    exports: [CloseButtonComponent],
})
export class CloseButtonModule {}
