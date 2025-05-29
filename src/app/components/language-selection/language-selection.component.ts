import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-language-selection",
  templateUrl: "./language-selection.component.html",
  styleUrl: "./language-selection.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectionComponent {
  private translate: TranslateService = inject(TranslateService);

  changeLanguage(langTag: string): void {
    this.translate.use(langTag);
  }
}
