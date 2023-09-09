import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  SudokuDropdownSelectionItem,
  SudokuDropdownSelectionService,
} from '@app/components/sudoku-settings/services/sudoku-dropdown-selection.service';
import { SudokuSettingsGridUpdateService } from '@app/components/sudoku-settings/services/sudoku-settings-grid-update.service';
import { VerifySolutionService } from '@app/core/verification/services/verify-solution.service';
import { VerificationResult } from '@app/core/verification/types/verification-result';
import { Nullable } from '@app/shared/types/nullable';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';
import { isDefined } from '@app/shared/util/is-defined';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SudokuSettingsStateService implements OnDestroy {
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
      this.dropdownSelectionItems[0]
    );

  private verification$: Observable<VerificationResult> = this.grid$.pipe(
    filter(isDefined),
    map((grid: SudokuGrid) =>
      this.verify.verify(grid, { trackUniquenessViolations: true })
    )
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

  getVerification(): Observable<Nullable<VerificationResult>> {
    return this.verification$;
  }

  setConfirmed(confirmed: boolean): void {
    this.confirmed$.next(confirmed);
  }

  setSelection(item: SudokuDropdownSelectionItem): void {
    this.setGrid(item.grid);
    this.dropdownSelectionItem$.next(item);
  }

  setGrid(grid: Nullable<SudokuGrid>): void {
    this.grid$.next(grid);
    this.height$.next(grid?.length);
    this.width$.next(grid?.[0]?.length);
    this.updateGrid();
  }

  setHeight(height: number): void {
    this.height$.next(height);
    this.updateGrid();
  }

  setWidth(width: number): void {
    this.width$.next(width);
    this.updateGrid();
  }

  private updateGrid(): void {
    if (this.grid$.value) {
      this.grid$.next(
        this.gridUpdate.updateGrid(
          this.grid$.value,
          this.height$.value,
          this.width$.value
        )
      );
    }
  }
}
