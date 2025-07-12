import { Assert } from "@app/util/assertions";

export class NextMultipleValuesCombination {
  private initialized: boolean;
  private combination: number[] | null;

  constructor(
    private readonly amount: number,
    private readonly maxValue: number,
  ) {
    Assert.state(
      amount <= maxValue,
      `${NextMultipleValuesCombination.name}: amount ${amount} has to be <= maxValue ${maxValue}`,
    );
    Assert.state(
      amount >= 2,
      `${NextMultipleValuesCombination.name}: amount ${amount} has to be >= 2`,
    );
    this.initialized = false;
  }

  get(): number[] | null {
    if (!this.initialized) {
      // [...Array(amount + 1).keys()] -> array containing values 0 to amount
      this.combination = [...Array(this.amount + 1).keys()].filter(
        (v) => v > 0,
      );
      this.initialized = true;
      return this.combination;
    } else {
      this.combination = this.increaseCombination();
      return this.combination;
    }
  }

  private increaseCombination(): number[] | null {
    const lastIndex: number = this.combination.length - 1;
    if (this.combination[lastIndex] + 1 <= this.maxValue) {
      return this.increaseFromIndex(lastIndex);
    } else {
      for (let i = lastIndex - 1; i >= 0; i--) {
        const valueIncreased = this.combination[i] + 1;
        if (valueIncreased < this.combination[i + 1]) {
          if (valueIncreased + (this.amount - i - 1) <= this.maxValue) {
            return this.increaseFromIndex(i);
          }
        }
      }
    }
    return null;
  }

  private increaseFromIndex(i: number): number[] {
    const nextCombination: number[] = this.combination.slice(0, i);
    nextCombination.push(this.combination.at(i) + 1);
    while (nextCombination.length < this.combination.length) {
      nextCombination.push(nextCombination.at(-1) + 1);
    }
    return nextCombination;
  }
}
