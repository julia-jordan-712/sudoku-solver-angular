import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  SudokuDropdownSelectionItem,
  SudokuDropdownSelectionService,
} from '@app/components/sudoku-settings/services/sudoku-dropdown-selection.service';
import { SudokuSettingsGridUpdateService } from '@app/components/sudoku-settings/services/sudoku-settings-grid-update.service';
import { Nullable } from '@app/shared/types/nullable';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SudokuSettingsStateService implements OnDestroy {
  private gridUpdate = inject(SudokuSettingsGridUpdateService);
  private dropdownSelection = inject(SudokuDropdownSelectionService);

  private confirmed$ = new BehaviorSubject<boolean>(false);
  private height$ = new BehaviorSubject<Nullable<number>>(undefined);
  private width$ = new BehaviorSubject<Nullable<number>>(undefined);
  private grid$ = new BehaviorSubject<Nullable<SudokuGrid>>(undefined);

  private dropdownSelectionItems = [...this.dropdownSelection.getItems()];
  private dropdownSelectionItem$ =
    new BehaviorSubject<SudokuDropdownSelectionItem>(
      this.dropdownSelectionItems[0]
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
    this.grid$.next(item.grid);
    this.height$.next(item.grid?.length);
    this.width$.next(item.grid?.[0]?.length);
    this.dropdownSelectionItem$.next(item);
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
