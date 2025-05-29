import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { Index } from "@app/types";
import { I18nKey, isI18nKey } from "@app/types/i18n-key";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "i18nKey",
  pure: false,
  standalone: true,
})
export class I18nKeyPipe implements PipeTransform, OnDestroy {
  private translate: TranslatePipe;

  constructor(
    translateService: TranslateService,
    changeDetector: ChangeDetectorRef,
  ) {
    this.translate = new TranslatePipe(translateService, changeDetector);
  }

  ngOnDestroy(): void {
    this.translate.ngOnDestroy();
  }

  transform(value: unknown): string {
    return isI18nKey(value)
      ? this.transformI18nKey(value)
      : typeof value === "string"
        ? this.translate.transform(value)
        : "";
  }

  private transformI18nKey(value: I18nKey): string {
    const params: Index<string | number | boolean> = {};
    Object.entries(value.params ?? {}).forEach(([paramKey, paramValue]) => {
      params[paramKey] = isI18nKey(paramValue)
        ? this.transformI18nKey(paramValue)
        : paramValue;
    });
    return this.translate.transform(value.key, params);
  }
}
