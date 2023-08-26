import { Injectable } from '@angular/core';
import { VerifySquare } from '@app/core/verification/services/verify-square';
import { VerifyUniqueness } from '@app/core/verification/services/verify-uniqueness';
import { VerificationResult } from '@app/core/verification/types/verification-result';
import { VerifySquareResult } from '@app/core/verification/types/verify-square-result';

@Injectable({
  providedIn: 'root',
})
export class VerifySolutionService {
  constructor() {}

  verify(candidate: number[][]): VerificationResult {
    const verifySquareResult: VerifySquareResult = new VerifySquare(
      candidate
    ).verifyAndGetSize();
    if (verifySquareResult.result.isValid()) {
      return new VerifyUniqueness(candidate, verifySquareResult.size).verify();
    } else {
      return verifySquareResult.result;
    }
  }
}
