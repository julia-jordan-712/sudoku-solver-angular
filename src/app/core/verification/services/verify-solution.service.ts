import { Injectable } from "@angular/core";
import { VerifySquare } from "@app/core/verification/services/verify-square";
import { VerifyUniqueness } from "@app/core/verification/services/verify-uniqueness";

@Injectable({
  providedIn: 'root',
})
export class VerifySolutionService {
  constructor() {}

  verify(candidate: number[][]): boolean {
    const size: number = new VerifySquare(candidate).verifyAndGetSize();
    return new VerifyUniqueness(candidate, size).verify();
  }
}
