import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ClipboardService } from "@app/core/clipboard/clipboard.service";
import { AppState } from "@app/state/app-state";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TestState } from "@test/state/test-state";
import { TranslateTestingModule } from "ngx-translate-testing";
import { DevelopmentSelectors } from "../state/development.selectors";
import { DevelopmentFunctionsComponent } from "./development-functions.component";

describe(DevelopmentFunctionsComponent.name, () => {
  let fixture: ComponentFixture<DevelopmentFunctionsComponent>;
  let clipboardService: ClipboardService;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DevelopmentFunctionsComponent,
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
      DevelopmentSelectors.selectShowDevelopmentFunctions,
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

      expect(getElement("app-sudoku-paste")).toBeTruthy();
      expect(getElement("app-restart")).toBeTruthy();
    });

    it("should NOT be visible in production mode", () => {
      setUp(false);

      expect(getElement("app-sudoku-copy")).toBeUndefined();
      expect(getCopyButton()).toBeUndefined();

      expect(getElement("app-sudoku-paste")).toBeUndefined();
      expect(getElement("app-restart")).toBeUndefined();
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
