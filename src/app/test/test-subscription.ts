import { isDefined } from "@app/shared/util/is-defined";
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  first,
  lastValueFrom,
  skipUntil,
  takeUntil,
} from "rxjs";

export class TestSubscription<T> {
  public static start<T>(input: Observable<T>): TestSubscription<T> {
    return new TestSubscription(input);
  }

  private value$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(
    null,
  );
  private values$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private destroyed$: Subject<void> = new Subject();

  private constructor(input$: Observable<T>) {
    const helperSubject: Subject<void> = new Subject();
    input$
      .pipe(skipUntil(helperSubject), takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.value$.next(value);
        this.values$.next([...this.values$.getValue(), value]);
      });
    helperSubject.next();
    helperSubject.complete();
  }

  getValue(): Promise<T> {
    return lastValueFrom(
      this.value$.asObservable().pipe(filter(isDefined), first()),
    );
  }

  getValues(): Promise<T[]> {
    return lastValueFrom(this.values$.asObservable().pipe(first()));
  }

  destroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
