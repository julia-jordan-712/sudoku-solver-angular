import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Logger } from "@app/core/log/logger";
import { EMPTY, from, map, Observable, switchMap, take, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class ClipboardService {
  private log: Logger = new Logger(ClipboardService.name);

  constructor(
    @Inject(DOCUMENT) private documentRef: Document,
    private sanitizer: DomSanitizer,
  ) {}

  copy<T extends ClipboardElement>(value: T): void {
    this.copyString(value.toClipboardString());
  }

  protected copyString(value: string): void {
    this.writeToClipboard(value);
  }

  private async writeToClipboard(clipboardString: string): Promise<void> {
    const type = "text/plain";
    await this.documentRef.defaultView?.navigator?.clipboard
      ?.write([
        new ClipboardItem({ [type]: new Blob([clipboardString], { type }) }),
      ])
      .then(() => this.log.logDebug("Copied to clipboard:", clipboardString));
  }

  getValue(): Observable<string> {
    const type = "text/plain";
    return from(
      this.documentRef.defaultView?.navigator?.clipboard?.read() ?? [],
    ).pipe(
      switchMap((items: ClipboardItems) => {
        const blobs = items
          .filter((item) => item.types.includes(type))[0]
          ?.getType(type);
        return blobs ?? EMPTY;
      }),
      take(1),
      switchMap((blob: Blob) => blob.text()),
      take(1),
      map((value) => this.sanitize(value)),
      tap((clipboardString) =>
        this.log.logDebug("Read from clipboard:", clipboardString),
      ),
    );
  }

  private sanitize(value: string): string {
    const div = this.documentRef.createElement("div");
    div.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, value) ?? "";
    const sanitized: string = div.innerText;
    div.remove();
    return sanitized;
  }
}

export interface ClipboardElement {
  toClipboardString(): string;
}
