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
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
import { Objects } from "@app/shared/util/objects";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  defer,
  filter,
  map,
  shareReplay,
} from "rxjs";

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
  private gridSubmitted$ = new BehaviorSubject<Nullable<SudokuGrid>>(undefined);
  private gridVerify$ = new BehaviorSubject<Nullable<SudokuGrid>>(undefined);

  private dropdownSelectionItems = [
    this.dropdownSelection.NO_SELECTION_ITEM,
    ...this.dropdownSelection.getItems(),
  ];
  private dropdownSelectionItem$ =
    new BehaviorSubject<SudokuDropdownSelectionItem>(
      this.dropdownSelection.NO_SELECTION_ITEM,
    );

  private readonly viewModel$: Observable<SudokuGridViewModel> = defer(() =>
    combineLatest([this.gridSubmitted$, this.gridVerify$]).pipe(
      map(([gridSubmitted, gridVerify]) => gridVerify ?? gridSubmitted),
      filter(isDefined),
      map((grid: SudokuGrid) =>
        SudokuGridViewModelConverter.createViewModelFromGrid(
          grid,
          "Sudoku-Settings-Grid-View-Model-Id",
          {
            id: "Sudoku-Settings-Grid-Branch",
            isCurrent: true,
          },
          this.verify.verify(grid, {
            allowEmptyCells: true,
            trackUniquenessViolations: true,
          }),
        ),
      ),
      shareReplay({ bufferSize: 1, refCount: false }),
    ),
  );

  public readonly duplicationColumnIndicesToRowIndices$: Observable<DuplicationColumnIndicesToRowIndices> =
    defer(() =>
      this.viewModel$.pipe(
        map((viewModel: SudokuGridViewModel) => viewModel.verificationResult),
        filter(isDefined),
        map((result: VerificationResult) =>
          this.convertDuplicates(result.getDuplicatesPerValue()),
        ),
        shareReplay({ bufferSize: 1, refCount: false }),
      ),
    );

  ngOnDestroy(): void {
    this.confirmed$.complete();
    this.height$.complete();
    this.width$.complete();
    this.gridSubmitted$.complete();
  }

  clearSelection(): void {
    this.dropdownSelectionItem$.next(this.dropdownSelection.NO_SELECTION_ITEM);
  }

  isConfirmEnabled(): Observable<boolean> {
    return this.viewModel$.pipe(
      map(
        (viewModel: SudokuGridViewModel) =>
          viewModel.verificationResult?.isValid() ?? false,
      ),
    );
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
    return this.gridSubmitted$.asObservable();
  }

  getViewModel(): Observable<SudokuGridViewModel> {
    return this.viewModel$;
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
    this.setSubmittedGrid(grid);
  }

  private setSubmittedGrid(grid: Nullable<SudokuGrid>): void {
    this.gridSubmitted$.next(grid);
    this.gridVerify$.next(undefined);
    this.height$.next(grid?.length);
    this.width$.next(grid?.[0]?.length);
  }

  verifyGrid(grid: Nullable<SudokuGrid>): void {
    this.gridVerify$.next(grid);
  }

  setHeightAndWidth(height: number, width: number): void {
    this.height$.next(height);
    this.width$.next(width);
    this.updateGrid();
  }

  private updateGrid(): void {
    this.gridSubmitted$.next(
      this.gridUpdate.updateGrid(
        this.gridSubmitted$.value ?? [],
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
