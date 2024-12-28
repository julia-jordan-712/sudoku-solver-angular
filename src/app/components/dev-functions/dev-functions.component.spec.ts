import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ClearStateComponent } from "@app/components/dev-functions/clear-state/clear-state.component";
import { CopySudokuComponent } from "@app/components/dev-functions/copy-sudoku/copy-sudoku.component";
import { DevFunctionsComponent } from "@app/components/dev-functions/dev-functions.component";
import { PasteSudokuComponent } from "@app/components/dev-functions/paste-sudoku/paste-sudoku.component";
import { ClipboardService } from "@app/components/dev-functions/services/clipboard.service";
import { DevFunctionsSelectors } from "@app/components/dev-functions/state/dev-functions.selectors";
import { SectionModule } from "@app/components/section/section.module";
import { AppState } from "@app/state/app-state";
import { IconTestComponent } from "@app/test/components/icon-test.component";
import { TestState } from "@app/test/state/test-state";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(DevFunctionsComponent.name, () => {
  let fixture: ComponentFixture<DevFunctionsComponent>;
  let clipboardService: ClipboardService;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CopySudokuComponent,
        ClearStateComponent,
        DevFunctionsComponent,
        IconTestComponent,
        PasteSudokuComponent,
      ],
      imports: [SectionModule, TranslateTestingModule.withTranslations({})],
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

    fixture = TestBed.createComponent(DevFunctionsComponent);
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
