import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-section",
    templateUrl: "./section.component.html",
    styleUrl: "./section.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class SectionComponent {}
