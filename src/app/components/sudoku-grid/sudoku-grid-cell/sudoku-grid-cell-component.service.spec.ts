import { fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { SudokuGridCellComponentService } from "@app/components/sudoku-grid/sudoku-grid-cell/sudoku-grid-cell-component.service";
import { TestSubscription } from "@app/test/test-subscription";

describe(SudokuGridCellComponentService.name, () => {
  let service: SudokuGridCellComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuGridCellComponentService],
    });
    service = TestBed.inject(SudokuGridCellComponentService);
  });

  describe("changed value", () => {
    it("should NOT be changed for initial value", async () => {
      const changed = TestSubscription.start(service.isChanged(), false);

      expect(await changed.value()).toEqual(false);

      service.setCell(1, true);

      expect(await changed.value()).toEqual(false);

      changed.destroy();
    });

    it("should be changed if value changed", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell(1, true);
      expect(await changed.value()).toEqual(false);

      service.setCell(2, true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should NOT be changed if value equals previous value", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell(1, true);
      expect(await changed.value()).toEqual(false);

      service.setCell(2, true);
      expect(await changed.value()).toEqual(true);

      service.setCell(2, true);
      expect(await changed.value()).toEqual(false);

      changed.destroy();
    });

    it("should be changed if value is replaced by multiple values", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell(1, true);
      expect(await changed.value()).toEqual(false);

      service.setCell([2, 3, 4], true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should be changed if value is replaced by empty array", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell(1, true);
      expect(await changed.value()).toEqual(false);

      service.setCell([], true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should be changed for initial values of current branch", async () => {
      const changed = TestSubscription.start(service.isChanged(), false);

      expect(await changed.value()).toEqual(false);

      service.setCell([1, 2], true);

      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should NOT be changed for initial values of non-current branch", async () => {
      const changed = TestSubscription.start(service.isChanged(), false);

      expect(await changed.value()).toEqual(false);

      service.setCell([1, 2], false);

      expect(await changed.value()).toEqual(false);

      changed.destroy();
    });

    it("should be changed if values changed", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell([1, 2], true);
      service.setCell([1, 2], true); // setting twice because initial array value is considered as changed
      expect(await changed.value()).toEqual(false);

      service.setCell([2, 3], true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should NOT be changed if values equal previous values", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell([1, 2], true);
      service.setCell([1, 2], true); // setting twice because initial array value is considered as changed
      expect(await changed.value()).toEqual(false);

      service.setCell([2, 3, 4], true);
      expect(await changed.value()).toEqual(true);

      service.setCell([4, 2, 3], true);
      expect(await changed.value()).toEqual(false);

      changed.destroy();
    });

    it("should be changed if values are replaced by single value", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell([2, 3, 4], true);
      service.setCell([2, 3, 4], true); // setting twice because initial array value is considered as changed
      expect(await changed.value()).toEqual(false);

      service.setCell(1, true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should be changed if empty array is replaced by filled array", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell([], true);
      service.setCell([], true); // setting twice because initial array value is considered as changed
      expect(await changed.value()).toEqual(false);

      service.setCell([9], true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });

    it("should be changed if empty array is replaced by single value", async () => {
      const changed = TestSubscription.start(service.isChanged());

      service.setCell([], true);
      service.setCell([], true); // setting twice because initial array value is considered as changed
      expect(await changed.value()).toEqual(false);

      service.setCell(7, true);
      expect(await changed.value()).toEqual(true);

      changed.destroy();
    });
  });

  describe("display value", () => {
    it("should have the display value(s) as passed in the last setCell call", async () => {
      const displayValue = TestSubscription.start(service.getDisplayValue());
      const displayValues = TestSubscription.start(service.getDisplayValues());

      service.setCell(1, true);
      expect(await displayValue.value()).toEqual(1);
      expect(await displayValues.value()).toBeNull();

      service.setCell(9, true);
      expect(await displayValue.value()).toEqual(9);
      expect(await displayValues.value()).toBeNull();

      service.setCell([2], true);
      expect(await displayValue.value()).toBeNull();
      expect(await displayValues.value()).toEqual([2]);

      displayValue.destroy();
      displayValues.destroy();
    });
  });

  it("should switch between previous and current value during hover", fakeAsync(async () => {
    const displayValue = TestSubscription.start(service.getDisplayValue());
    service.setCell(5, true);
    service.setCell(7, true);

    service.onMouseEnter();

    expect(await displayValue.value()).toEqual(7);

    tick(1000);
    expect(await displayValue.value()).toEqual(5);

    tick(1000);
    expect(await displayValue.value()).toEqual(7);

    service.onMouseLeave();

    tick(1000);
    expect(await displayValue.value()).toEqual(7);

    tick(1000);
    expect(await displayValue.value()).toEqual(7);

    flush();
  }));

  it("should switch between previous and current values during hover", fakeAsync(async () => {
    const displayValues = TestSubscription.start(service.getDisplayValues());
    service.setCell([1, 2, 3], true);
    service.setCell([4, 5, 6], true);

    service.onMouseEnter();

    expect(await displayValues.value()).toEqual([4, 5, 6]);

    tick(1000);
    expect(await displayValues.value()).toEqual([1, 2, 3]);

    tick(1000);
    expect(await displayValues.value()).toEqual([4, 5, 6]);

    service.onMouseLeave();

    tick(1000);
    expect(await displayValues.value()).toEqual([4, 5, 6]);

    tick(1000);
    expect(await displayValues.value()).toEqual([4, 5, 6]);

    flush();
  }));
});
