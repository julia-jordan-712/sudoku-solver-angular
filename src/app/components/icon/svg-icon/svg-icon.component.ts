import { HttpClient } from "@angular/common/http";
import { Component, inject, Input, OnDestroy } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { isDefined } from "@app/shared/util/is-defined";
import { BehaviorSubject, filter, map, Observable, switchMap } from "rxjs";

@Component({
  selector: "app-svg-icon",
  templateUrl: "./svg-icon.component.html",
  styleUrl: "./svg-icon.component.scss",
})
export class SvgIconComponent implements OnDestroy {
  private httpClient: HttpClient = inject(HttpClient);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  private icon$: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  svg$: Observable<SafeHtml> = this.icon$.pipe(
    filter(isDefined),
    switchMap((icon) =>
      this.httpClient
        .get(`assets/icons/${icon}.svg`, { responseType: "text" })
        .pipe(map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg))),
    ),
  );

  @Input({ required: true })
  set icon(icon: string) {
    this.icon$.next(icon);
  }

  ngOnDestroy(): void {
    this.icon$.complete();
  }
}
