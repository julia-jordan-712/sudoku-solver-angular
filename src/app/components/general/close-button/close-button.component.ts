import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: "app-close-button",
    templateUrl: "./close-button.component.html",
    styleUrl: "./close-button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent],
})
export class CloseButtonComponent {}
