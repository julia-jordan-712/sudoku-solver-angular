import { Component, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent {
  private translate: TranslateService = inject(TranslateService);

  changeLanguage(langTag: string): void {
    this.translate.use(langTag);
  }
}
