import { OnDestroy } from "@angular/core";
import { ClipboardService } from "@app/core/clipboard/clipboard.service";
import { BehaviorSubject, Observable } from "rxjs";

export class ClipboardServiceMock
  extends ClipboardService
  implements OnDestroy
{
  public readonly clipboardString$: BehaviorSubject<string> =
    new BehaviorSubject<string>("");

  ngOnDestroy(): void {
    this.clipboardString$.complete();
  }

  protected override copyString(value: string): void {
    this.clipboardString$.next(value);
  }

  override getValue(): Observable<string> {
    return this.clipboardString$.asObservable();
  }
}
