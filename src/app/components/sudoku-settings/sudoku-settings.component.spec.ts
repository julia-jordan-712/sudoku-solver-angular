import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DropdownInputTestComponent } from "@app/test/components/dropdown-input-test.component";
import { NumberInputTestComponent } from "@app/test/components/number-input-test.component";
import { SudokuGridTestComponent } from "@app/test/components/sudoku-grid-test.component";
import { Puzzle4x4 } from "@app/test/puzzles/puzzle-4x4";
import { TranslateTestingModule } from "ngx-translate-testing";
import { of } from "rxjs";
import { SudokuSettingsComponent } from "./sudoku-settings.component";

describe(SudokuSettingsComponent.name, () => {
  let fixture: ComponentFixture<SudokuSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SudokuSettingsComponent,
        DropdownInputTestComponent,
        NumberInputTestComponent,
        SudokuGridTestComponent,
      ],
      imports: [TranslateTestingModule.withTranslations({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuSettingsComponent);
    fixture.detectChanges();
  });

  it("should have dropdown, two input fields and confirm button initially", () => {
    expect(queryDropdown()).not.toBeNull();
    expect(querySize()).not.toBeNull();
    expect(queryGrid()).not.toBeNull();
    expect(queryConfirm()).not.toBeNull();

    expect(queryChangeSettings()).toBeNull();
  });

  it("should update the grid when selection changes", () => {
    const dropdown: DropdownInputTestComponent = getDropdown();
    const size: NumberInputTestComponent = getSizeInput();
    const grid: SudokuGridTestComponent = getSudokuGrid();

    dropdown.change({
      id: "",
      name: of("Puzzle 4x4"),
      grid: Puzzle4x4.COMPLETE,
    });
    fixture.detectChanges();
    expect(grid.grid).toEqual(Puzzle4x4.COMPLETE);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.duplications).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");
    expect(queryConfirm().disabled).toEqual(false);

    const gridWithDuplications = [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 3, 4, 1],
      [4, 1, 2, 4],
    ];
    grid.change(gridWithDuplications);
    fixture.detectChanges();
    expect(grid.grid).toEqual(gridWithDuplications);
    expect(grid.verification?.isValid()).toEqual(false);
    expect(grid.duplications).toEqual({
      0: [3], // first row, last column
      2: [2], // third row, third column
      3: [0, 3], // last row, first and last column
    });
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");
    expect(queryConfirm().disabled).toEqual(true);

    size.change(3);
    fixture.detectChanges();
    expect(grid.grid).toEqual([
      [1, 2, 3],
      [3, 4, 1],
      [2, 3, 4],
    ]);
    expect(grid.verification?.isValid()).toEqual(false);
    expect(grid.duplications).toEqual({});
    expect(querySize().innerText).toEqual("3");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");
    expect(queryConfirm().disabled).toEqual(true);

    size.change(4);
    fixture.detectChanges();
    expect(grid.grid).toEqual([
      [1, 2, 3, undefined],
      [3, 4, 1, undefined],
      [2, 3, 4, undefined],
      [undefined, undefined, undefined, undefined],
    ]);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.duplications).toEqual({});
    expect(querySize().innerText).toEqual("4");
    expect(queryDropdown().innerText).toEqual("Puzzle 4x4");
    expect(queryConfirm().disabled).toEqual(false);
  });

  it("should re-initialize with the previous state after confirm and change-settings again", () => {
    const dropdown: DropdownInputTestComponent = getDropdown();
    const grid: SudokuGridTestComponent = getSudokuGrid();

    dropdown.change({
      id: "",
      name: of("Puzzle 4x4"),
      grid: Puzzle4x4.COMPLETE,
    });
    fixture.detectChanges();

    expect(grid.grid).toEqual(Puzzle4x4.COMPLETE);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.duplications).toEqual({});
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
    expect(grid.grid).toEqual(Puzzle4x4.COMPLETE);
    expect(grid.verification?.isValid()).toEqual(true);
    expect(grid.duplications).toEqual({});
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
});
