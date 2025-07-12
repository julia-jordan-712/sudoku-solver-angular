import { NextMultipleValuesCombination } from "@app/core/solver/solver-eliminate/util/next-multiple-values-combination";

describe(NextMultipleValuesCombination.name, () => {
  it("should return [1,2] [1,3] [1,4] [1,5] [1,6] [1,7] [1,8] [1,9] for amount=2 and maxValue=9 and then increase to [2,3]", () => {
    const underTest = new NextMultipleValuesCombination(2, 9);
    for (let i = 2; i < 9; i++) {
      expect(underTest.get()).toEqual([1, i]);
    }
    expect(underTest.get()).toEqual([1, 9]);
    expect(underTest.get()).toEqual([2, 3]);
  });

  it("should increase from [1,2,9] to [1,3,4]", () => {
    const underTest = new NextMultipleValuesCombination(3, 9);
    for (let i = 3; i < 9; i++) {
      expect(underTest.get()).toEqual([1, 2, i]);
    }
    expect(underTest.get()).toEqual([1, 2, 9]);
    expect(underTest.get()).toEqual([1, 3, 4]);
  });

  it("should increase from [6,7,9] to [6,8,9] to [7,8,9] and then stop", () => {
    const underTest = new NextMultipleValuesCombination(3, 9);
    while (underTest.get().toString() !== "6,7,9") {
      continue;
    }
    expect(underTest.get()).toEqual([6, 8, 9]);
    expect(underTest.get()).toEqual([7, 8, 9]);
    expect(underTest.get()).toBeNull();
  });
});
