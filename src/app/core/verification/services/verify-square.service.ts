import { Injectable } from '@angular/core';
import { VerifySquare } from '@app/core/verification/services/verify-square';
import { VerificationOptions } from '@app/core/verification/types/verification-options';
import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifySquareResult } from '@app/core/verification/types/verify-square-result';
import { Nullable } from '@app/shared/types/nullable';

@Injectable({
  providedIn: 'root',
})
export class VerifySquareService {
  public verify(candidate: Nullable<number>[][]): VerifySquareResult {
    return new VerifySquare(candidate).verifyAndGetSize();
  }
}
