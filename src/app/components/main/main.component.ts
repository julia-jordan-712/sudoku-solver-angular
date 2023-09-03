import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private translate: TranslateService) {}

  changeLanguage(langTag: string) {
    this.translate.use(langTag);
  }
}
