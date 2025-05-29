import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  private emptyIcon = "empty";
  protected url: string = this.toUrl(this.emptyIcon);

  @Input({ required: true })
  @HostBinding("attr.data-cy")
  icon: string;

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.icon) {
      this.url = this.toUrl(this.icon);
    } else {
      this.url = this.toUrl(this.emptyIcon);
    }
  }

  private toUrl(icon: string): string {
    return `url('assets/icons/${icon}.svg')`;
  }
}
