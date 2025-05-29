import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from "@angular/core";
import { StateInBrowserStorageService } from "@app/state/state-in-browser-storage.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private translate: TranslateService = inject(TranslateService);
  private storage: StateInBrowserStorageService = inject(
    StateInBrowserStorageService,
  );

  @HostListener("window:beforeunload")
  beforeunloadHandler(): void {
    this.storage.storeStateInBrowser();
  }

  constructor() {
    this.initializeI18n();
  }

  private initializeI18n(): void {
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }
}
