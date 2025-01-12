import { Component, Input } from "@angular/core";
import { Nullable } from "@app/types/nullable";

@Component({
  selector: "app-label-input",
  templateUrl: "./label-input.component.html",
  styleUrl: "./label-input.component.scss",
})
export class LabelInputComponent {
  @Input({ required: true })
  label: Nullable<string>;

  @Input()
  info: Nullable<string>;
}
