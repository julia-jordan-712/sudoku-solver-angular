import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Logger } from "@app/core/log/logger";

@Injectable({ providedIn: "root" })
export class ClipboardService {
  private log: Logger = new Logger(ClipboardService.name);

  constructor(@Inject(DOCUMENT) private documentRef: Document) {}

  copy<T extends ClipboardElement>(value: T): void {
    const clipboardString = value.toClipboardString();
    this.documentRef.defaultView?.navigator?.clipboard
      ?.writeText(clipboardString)
      .then(() => this.log.logDebug("Copied to clipboard", clipboardString));
  }
}

export interface ClipboardElement {
  toClipboardString(): string;
}
