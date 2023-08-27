import { Injectable } from '@angular/core';
import { VerifyUniqueness } from '@app/core/verification/services/verify-uniqueness';
import { VerificationOptions } from '@app/core/verification/types/verification-options';
import { VerificationResult } from '@app/core/verification/types/verification-result';
import { Nullable } from '@app/shared/types/nullable';

@Injectable({
  providedIn: 'root',
})
export class VerifyUniquenessService {
  verify(
    candidate: Nullable<number>[][],
    size: number,
    options: VerificationOptions = {}
  ): VerificationResult {
    return new VerifyUniqueness(candidate, size).verify(options);
  }
}
