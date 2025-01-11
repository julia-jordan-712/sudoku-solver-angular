import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ClearStateComponent } from "@app/components/development-functions/clear-state/clear-state.component";
import { DevelopmentFunctionsComponent } from "@app/components/development-functions/development-functions.component";
import { PasteSudokuComponent } from "@app/components/development-functions/paste-sudoku/paste-sudoku.component";
import { ClipboardService } from "@app/components/development-functions/services/clipboard.service";
import { DevFunctionsSelectors } from "@app/components/development-functions/state/dev-functions.selectors";
import { TestSudokusComponent } from "@app/components/development-functions/test-sudokus/test-sudokus.component";
import { DropdownModule } from "@app/components/general/dropdown/dropdown.module";
import { SectionModule } from "@app/components/general/section/section.module";
import { SudokuCopyModule } from "@app/components/sudoku-copy/sudoku-copy.module";
import { AppState } from "@app/state/app-state";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { IconTestComponent } from "@test/components/icon-test.component";
import { TestState } from "@test/state/test-state";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(DevelopmentFunctionsComponent.name, () => {
  let fixture: ComponentFixture<DevelopmentFunctionsComponent>;
  let clipboardService: ClipboardService;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ClearStateComponent,
        DevelopmentFunctionsComponent,
        IconTestComponent,
        PasteSudokuComponent,
        TestSudokusComponent,
      ],
      imports: [
        DropdownModule,
        SectionModule,
        SudokuCopyModule,
        TranslateTestingModule.withTranslations({}),
      ],
      providers: [
        provideHttpClient(),
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

      expect(getElement("app-sudoku-copy")).toBeTruthy();
      expect(getCopyButton()).toBeTruthy();

      expect(getElement("app-paste-sudoku")).toBeTruthy();
      expect(getElement("app-clear-state")).toBeTruthy();
    });

    it("should NOT be visible in production mode", () => {
      setUp(false);

      expect(getElement("app-sudoku-copy")).toBeUndefined();
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
