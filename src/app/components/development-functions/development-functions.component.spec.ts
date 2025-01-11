import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ClearStateComponent } from "./clear-state/clear-state.component";
import { CopySudokuComponent } from "./copy-sudoku/copy-sudoku.component";
import { DevelopmentFunctionsComponent } from "./development-functions.component";
import { PasteSudokuComponent } from "./paste-sudoku/paste-sudoku.component";
import { ClipboardService } from "./services/clipboard.service";
import { DevFunctionsSelectors } from "./state/dev-functions.selectors";
import { TestSudokusComponent } from "./test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { AppState } from "@app/state/app-state";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateTestingModule } from "ngx-translate-testing";
import { IconTestComponent } from "../../../test/components/icon-test.component";
import { TestState } from "../../../test/state/test-state";

describe(DevelopmentFunctionsComponent.name, () => {
  let fixture: ComponentFixture<DevelopmentFunctionsComponent>;
  let clipboardService: ClipboardService;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CopySudokuComponent,
        ClearStateComponent,
        DevelopmentFunctionsComponent,
        IconTestComponent,
        PasteSudokuComponent,
        TestSudokusComponent,
      ],
      imports: [
        DropdownModule,
        SectionModule,
        TranslateTestingModule.withTranslations({}),
      ],
      providers: [
        provideMockStore({ initialState: TestState.createTestAppState() }),
      ],
    }).compileComponents();
    clipboardService = TestBed.inject(ClipboardService);
    store = TestBed.inject(MockStore);

    spyOn(clipboardService, "copy").and.callFake(() => Promise.resolve());
  });

  function setUp(isDevelopment: boolean): void {
    store.overrideSelector(
      DevFunctionsSelectors.selectIsDevelopment,
      isDevelopment,
    );

    fixture = TestBed.createComponent(DevelopmentFunctionsComponent);
    fixture.detectChanges();
  }

  describe("development function buttons", () => {
    it("should be visible in development mode", () => {
      setUp(true);

      expect(getElement("app-copy-sudoku")).toBeTruthy();
      expect(getCopyButton()).toBeTruthy();

      expect(getElement("app-paste-sudoku")).toBeTruthy();
      expect(getElement("app-clear-state")).toBeTruthy();
    });

    it("should NOT be visible in production mode", () => {
      setUp(false);

      expect(getElement("app-copy-sudoku")).toBeUndefined();
      expect(getCopyButton()).toBeUndefined();

      expect(getElement("app-paste-sudoku")).toBeUndefined();
      expect(getElement("app-clear-state")).toBeUndefined();
    });
  });

  describe("copy sudoku button", () => {
    it("should call the clipboard service on every click", () => {
      setUp(true);
      expect(clipboardService.copy).not.toHaveBeenCalled();

      expect(getCopyButton().disabled).toBeFalse();
      getCopyButton().click();
      expect(clipboardService.copy).toHaveBeenCalledTimes(1);

      getCopyButton().click();
      expect(clipboardService.copy).toHaveBeenCalledTimes(2);
    });
  });

  function getCopyButton(): HTMLButtonElement {
    return getElement("button[data-cy=copySudoku]") as HTMLButtonElement;
  }

  function getElement(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector))?.nativeElement;
  }
});
