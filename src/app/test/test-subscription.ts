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
  public static start<T>(
    input: Observable<T>,
    skipPreviousEmissions = true,
  ): TestSubscription<T> {
    return new TestSubscription(input, skipPreviousEmissions);
  }

  private value$: BehaviorSubject<T> = new BehaviorSubject<T>(undefined as T);
  private values$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private destroyed$: Subject<void> = new Subject();

  private constructor(input$: Observable<T>, skipPreviousEmissions: boolean) {
    if (skipPreviousEmissions) {
      const helperSubject: Subject<void> = new Subject();
      input$
        .pipe(skipUntil(helperSubject), takeUntil(this.destroyed$))
        .subscribe((v) => this.nextValue(v));
      helperSubject.next();
      helperSubject.complete();
    } else {
      input$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((v) => this.nextValue(v));
    }
  }

  private nextValue(value: T): void {
    this.value$.next(value);
    this.values$.next([...this.values$.getValue(), value]);
  }

  value(): Promise<T> {
    return lastValueFrom(
      this.value$.asObservable().pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filter((_) => this.values$.getValue().length > 0),
        first(),
      ),
    );
  }

  values(): Promise<T[]> {
    return lastValueFrom(this.values$.asObservable().pipe(first()));
  }

  destroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
