import { Injectable, OnDestroy, inject } from "@angular/core";
import {
  SudokuDropdownSelectionItem,
  SudokuDropdownSelectionService,
} from "@app/components/sudoku-settings/services/sudoku-dropdown-selection.service";
import { SudokuSettingsGridUpdateService } from "@app/components/sudoku-settings/services/sudoku-settings-grid-update.service";
import { VerifySolutionService } from "@app/core/verification/services/verify-solution.service";
import { Nullable } from "@app/shared/types/nullable";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModel } from "@app/shared/types/sudoku-grid-view-model";
import { isDefined } from "@app/shared/util/is-defined";
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
import { v4 as randomUUID } from "uuid";

@Injectable({
  providedIn: "root",
})
export class SudokuSettingsStateService implements OnDestroy {
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

  private readonly viewModel$: Observable<Nullable<SudokuGridViewModel>> =
    defer(() =>
      combineLatest([this.gridSubmitted$, this.gridVerify$]).pipe(
        map(([gridSubmitted, gridVerify]) => gridVerify ?? gridSubmitted),
        map((grid: Nullable<SudokuGrid>) =>
          grid
            ? SudokuGridViewModelConverter.createViewModelFromGrid(
                grid,
                randomUUID(),
                {
                  id: "Sudoku-Settings-Grid-Branch",
                  isCurrent: true,
                },
                this.verify.verify(grid, {
                  allowEmptyCells: true,
                  trackUniquenessViolations: true,
                }),
              )
            : null,
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
        (viewModel: Nullable<SudokuGridViewModel>) =>
          viewModel?.verificationResult?.isValid() ?? false,
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
    return this.viewModel$.pipe(filter(isDefined));
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
}
