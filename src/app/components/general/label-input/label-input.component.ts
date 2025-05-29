import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Nullable } from "@app/types/nullable";
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: "app-label-input",
  templateUrl: "./label-input.component.html",
  styleUrl: "./label-input.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconComponent],
})
export class LabelInputComponent {
  @Input({ required: true })
  label: Nullable<string>;

  @Input()
  info: Nullable<string>;
}
