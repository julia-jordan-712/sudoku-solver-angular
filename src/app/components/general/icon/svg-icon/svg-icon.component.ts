import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-svg-icon",
  templateUrl: "./svg-icon.component.html",
  styleUrl: "./svg-icon.component.scss",
})
export class SvgIconComponent implements OnChanges {
  private emptyIcon = "empty";
  protected url: string = this.toUrl(this.emptyIcon);

  @Input({ required: true })
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
