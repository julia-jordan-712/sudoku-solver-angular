import { Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent {
  @HostBinding("attr.data-cy")
  @Input({ required: true })
  icon: string;

  @Input()
  type: "mat" | "svg" = "svg";
}
