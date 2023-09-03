import { Injectable } from '@angular/core';
import { VerifySquare } from '@app/core/verification/services/verify-square';
import { VerifySquareResult } from '@app/core/verification/types/verify-square-result';
import { SudokuGrid } from '@app/shared/types/sudoku-grid';

@Injectable({
  providedIn: 'root',
})
export class VerifySquareService {
  public verify(candidate: SudokuGrid): VerifySquareResult {
    return new VerifySquare(candidate).verifyAndGetSize();
  }
}
