import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IconModule } from "@app/components/icon/icon.module";
import { SudokuPuzzleComponent } from "@app/components/sudoku-puzzle/sudoku-puzzle.component";
import { VerificationDuplicates } from "@app/core/verification/types/verification-duplicates";
import { CellPosition } from "@app/shared/types/cell-position";
import { SudokuGrid } from "@app/shared/types/sudoku-grid";
import { SudokuGridViewModelConverter } from "@app/shared/util/sudoku-grid-view-model-converter";
import { DropdownInputTestComponent } from "@app/test/components/dropdown-input-test.component";
import { NumberInputTestComponent } from "@app/test/components/number-input-test.component";
import { SelectionListTestComponent } from "@app/test/components/selection-list-test.component";
import { SudokuGridTestComponent } from "@app/test/components/sudoku-grid-test.component";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { SUDOKU_SOLVER_STATE_MOCK_PROVIDER } from "@app/test/solver/sudoku-solver-state-mock.service";
import { SOLVER_TEST_PROVIDERS } from "@app/test/solver/sudoku-solver-test.provider";
import { TestState } from "@app/test/state/test-state";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(SudokuPuzzleComponent.name, () => {
  let fixture: ComponentFixture<SudokuPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SudokuPuzzleComponent,
        DropdownInputTestComponent,
        SelectionListTestComponent,
        SudokuGridTestComponent,
      ],
      imports: [TranslateTestingModule.withTranslations({}), IconModule],
      providers: [
        ...SOLVER_TEST_PROVIDERS,
        ...SUDOKU_SOLVER_STATE_MOCK_PROVIDER,
        ...TestState.mockStoreProviders(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuPuzzleComponent);
    fixture.detectChanges();
  });

  it("should have dropdown, two input fields and confirm button initially", () => {
    expect(queryDropdown()).not.toBeNull();
    expect(querySize()).not.toBeNull();
    expect(queryGrid()).not.toBeNull();
    expect(queryConfirm()).not.toBeNull();

    expect(queryChangeSettings()).toBeNull();
  });

  it("should update the grid when dropdown changes", () => {
    const dropdown: DropdownInputTestComponent = getDropdown();
    const grid: SudokuGridTestComponent = getSudokuGrid();

    dropdown.change({
      id: "some-id",
      name: "Puzzle 4x4",
      grid: Puzzle4x4.COMPLETE,
    });
    fixture.detectChanges();
    expectGridToEqual(grid, Puzzle4x4.COMPLETE);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.verification?.getDuplicatesPerValue()).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");
    expect(queryConfirm().disabled).toEqual(false);
  });

  it("should update the grid when cell change is submitted", () => {
    const grid: SudokuGridTestComponent = getSudokuGrid();

    /**
     * Value 4 is duplicated in
     * - last column: first row and last row -> position (0,3) and (3,3)
     * - last row: first column and last column -> position (3,0) and (3,3)
     * - last square: position (2,2) and (3,3)
     */
    const gridWithDuplications = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 4],
    ];
    grid.submit(gridWithDuplications);
    fixture.detectChanges();
    expectGridToEqual(grid, gridWithDuplications);
    expect(grid.verification?.isValid()).toEqual(false);
    const duplicates: VerificationDuplicates | undefined =
      grid.verification?.getDuplicatesPerValue();
    expect(Object.keys(duplicates ?? {}).length).toEqual(1);
    expect(duplicates?.[4]).toEqual([
      new CellPosition(3, 0),
      new CellPosition(3, 3),
      new CellPosition(0, 3),
      new CellPosition(2, 2),
    ]);
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("PUZZLE.NONE");
    expect(queryConfirm().disabled).toEqual(true);
  });

  it("should update the grid when size changes", () => {
    const size: NumberInputTestComponent = getSizeInput();
    const grid: SudokuGridTestComponent = getSudokuGrid();
    grid.submit(Puzzle4x4.COMPLETE);

    size.change(3);
    fixture.detectChanges();
    expectGridToEqual(grid, [
      [1, 2, 3],
      [3, 4, 1],
      [2, 3, 4],
    ]);
    expect(grid.verification?.isValid()).toEqual(false);
    expect(grid.verification?.getDuplicatesPerValue()).toEqual({});
    expect(querySize().innerText).toEqual("3");
    expect(queryDropdown().innerText).toEqual("PUZZLE.NONE");
    expect(queryConfirm().disabled).toEqual(true);

    size.change(4);
    fixture.detectChanges();
    expectGridToEqual(grid, [
      [1, 2, 3, undefined],
      [3, 4, 1, undefined],
      [2, 3, 4, undefined],
      [undefined, undefined, undefined, undefined],
    ]);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.verification?.getDuplicatesPerValue()).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("PUZZLE.NONE");
    expect(queryConfirm().disabled).toEqual(false);
  });

  it("should update the verification when cell is changed but not submitted", () => {
    const grid: SudokuGridTestComponent = getSudokuGrid();
    grid.submit(Puzzle4x4.COMPLETE);
    fixture.detectChanges();
    expectGridToEqual(grid, Puzzle4x4.COMPLETE);

    const gridWithInvalidNumber = [
      [9, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 3],
    ];
    grid.change(gridWithInvalidNumber);
    fixture.detectChanges();

    expectGridToEqual(grid, gridWithInvalidNumber);
    expect(grid.verification?.isValid()).toEqual(false);
    expect(grid.verification?.getDuplicatesPerValue()).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("PUZZLE.NONE");
    expect(queryConfirm().disabled).toEqual(true);

    grid.change(Puzzle4x4.EMPTY_COLUMN);
    fixture.detectChanges();

    expectGridToEqual(grid, Puzzle4x4.EMPTY_COLUMN);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(queryConfirm().disabled).toEqual(false);

    grid.submit(Puzzle4x4.EMPTY_COLUMN);
    fixture.detectChanges();

    expectGridToEqual(grid, Puzzle4x4.EMPTY_COLUMN);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(queryConfirm().disabled).toEqual(false);
  });

  it("should re-initialize with the previous state after confirm and change-settings again", () => {
    const dropdown: DropdownInputTestComponent = getDropdown();
    const grid: SudokuGridTestComponent = getSudokuGrid();

    dropdown.change({
      id: "some-id",
      name: "Puzzle 4x4",
      grid: Puzzle4x4.COMPLETE,
    });
    fixture.detectChanges();

    expectGridToEqual(grid, Puzzle4x4.COMPLETE);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.verification?.getDuplicatesPerValue()).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");

    queryConfirm().click();
    fixture.detectChanges();

    expect(queryDropdown()).toBeNull();
    expect(querySize()).toBeNull();
    expect(queryGrid()).toBeNull();
    expect(queryConfirm()).toBeNull();
    expect(queryChangeSettings()).not.toBeNull();
    expect(queryChangeSettings().disabled).toEqual(false);

    queryChangeSettings().click();
    fixture.detectChanges();

    expect(queryChangeSettings()).toBeNull();
    expectGridToEqual(grid, Puzzle4x4.COMPLETE);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.verification?.getDuplicatesPerValue()).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");
  });

  function queryDropdown(): any {
    return fixture.nativeElement.querySelector("app-dropdown-input");
  }
  function querySize(): any {
    return fixture.nativeElement.querySelector("#sizeInput");
  }
  function queryGrid(): any {
    return fixture.nativeElement.querySelector("app-sudoku-grid");
  }
  function queryConfirm(): any {
    return fixture.nativeElement.querySelector("#confirmSettings");
  }
  function queryChangeSettings(): any {
    return fixture.nativeElement.querySelector("#changeSettings");
  }

  function getDropdown(): DropdownInputTestComponent {
    return fixture.debugElement.query(By.css("app-dropdown-input"))
      .componentInstance;
  }
  function getSizeInput(): NumberInputTestComponent {
    return fixture.debugElement.query(By.css("#sizeInput")).componentInstance;
  }
  function getSudokuGrid(): SudokuGridTestComponent {
    return fixture.debugElement.query(By.css("app-sudoku-grid"))
      .componentInstance;
  }

  function expectGridToEqual(
    component: SudokuGridTestComponent,
    expected: SudokuGrid,
  ): void {
    expect(component._grid).toBeTruthy();
    expect(
      SudokuGridViewModelConverter.createGridFromViewModel(component._grid!),
    ).toEqual(expected);
  }
});
