import { Injectable, OnDestroy, inject } from "@angular/core";
import {
  SudokuDropdownSelectionItem,
  SudokuDropdownSelectionService,
} from "@app/components/sudoku-settings/services/sudoku-dropdown-selection.service";
import { SudokuSettingsGridUpdateService } from "@app/components/sudoku-settings/services/sudoku-settings-grid-update.service";
import { Logger } from "@app/core/log/logger";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { VerificationDuplicates } from "@app/core/verification/types/verification-duplicates";
import { VerificationResult } from "@app/core/verification/types/verification-result";
import { Index } from "@app/shared/types";
import { CellPosition } from "@app/shared/types/cell-position";
import { Nullable } from "@app/shared/types/nullable";
import { StopWatch } from "@app/shared/types/stopwatch";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { isDefined } from "@app/shared/util/is-defined";
import { Objects } from "@app/shared/util/objects";
import { BehaviorSubject, Observable, filter, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SudokuSettingsStateService implements OnDestroy {
  private logger: Logger = new Logger(SudokuSettingsStateService.name);

  private gridUpdate = inject(SudokuSettingsGridUpdateService);
  private dropdownSelection = inject(SudokuDropdownSelectionService);
  private verify = inject(VerifySolutionService);

  private confirmed$ = new BehaviorSubject<boolean>(false);
  private height$ = new BehaviorSubject<Nullable<number>>(undefined);
  private width$ = new BehaviorSubject<Nullable<number>>(undefined);
  private grid$ = new BehaviorSubject<Nullable<SudokuGrid>>(undefined);

  private dropdownSelectionItems = [...this.dropdownSelection.getItems()];
  private dropdownSelectionItem$ =
    new BehaviorSubject<SudokuDropdownSelectionItem>(
      this.dropdownSelectionItems[0],
    );

  public readonly verification$: Observable<VerificationResult> =
    this.grid$.pipe(
      filter(isDefined),
      map((grid: SudokuGrid) =>
        this.verify.verify(grid, { trackUniquenessViolations: true }),
      ),
    );
  public readonly duplicationColumnIndicesToRowIndices$: Observable<DuplicationColumnIndicesToRowIndices> =
    this.verification$.pipe(
      map((result: VerificationResult) =>
        this.convertDuplicates(result.getDuplicatesPerValue()),
      ),
    );

  ngOnDestroy(): void {
    this.confirmed$.complete();
    this.height$.complete();
    this.width$.complete();
    this.grid$.complete();
  }

  isConfirmed(): Observable<boolean> {
    return this.confirmed$.asObservable();
  }

  getHeight(): Observable<Nullable<number>> {
    return this.height$.asObservable();
  }

  getWidth(): Observable<Nullable<number>> {
    return this.width$.asObservable();
  }

  getGrid(): Observable<Nullable<SudokuGrid>> {
    return this.grid$.asObservable();
  }

  getSelectionItems(): SudokuDropdownSelectionItem[] {
    return this.dropdownSelectionItems;
  }

  getSelectedItem(): Observable<SudokuDropdownSelectionItem> {
    return this.dropdownSelectionItem$.asObservable();
  }

  setConfirmed(confirmed: boolean): void {
    this.confirmed$.next(confirmed);
  }

  setSelection(item: SudokuDropdownSelectionItem): void {
    this.setGrid(item.grid);
    this.updateGrid();
    this.dropdownSelectionItem$.next(item);
  }

  setGrid(grid: Nullable<SudokuGrid>): void {
    this.grid$.next(grid);
    this.height$.next(grid?.length);
    this.width$.next(grid?.[0]?.length);
  }

  setHeightAndWidth(height: number, width: number): void {
    this.height$.next(height);
    this.width$.next(width);
    this.updateGrid();
  }

  private updateGrid(): void {
    this.grid$.next(
      this.gridUpdate.updateGrid(
        this.grid$.value ?? [],
        this.height$.value,
        this.width$.value,
      ),
    );
  }

  private convertDuplicates(
    duplicates: VerificationDuplicates,
  ): DuplicationColumnIndicesToRowIndices {
    return StopWatch.monitor(
      () => {
        const cellPositions: CellPosition[] = Objects.uniqueArray(
          Object.values(duplicates).flat(),
          (a, b) => a.equals(b),
        );
        return Objects.arrayToArrayIndex(
          cellPositions,
          (c) => c.x.toString(),
          (c) => c.y,
        );
      },
      this.logger,
      { message: "Convert duplicates" },
    );
  }
}

/**
 * The column indices of cells which contain a duplicate mapped
 * to the row index of these cells.
 */
export type DuplicationColumnIndicesToRowIndices = Index<number[]>;
