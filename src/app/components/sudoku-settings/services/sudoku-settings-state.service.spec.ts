import { TestBed } from "@angular/core/testing";

import { SudokuSettingsStateService } from "./sudoku-settings-state.service";
import { TranslateTestingModule } from "ngx-translate-testing";

describe(SudokuSettingsStateService.name, () => {
  let service: SudokuSettingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations({})],
    });
    service = TestBed.inject(SudokuSettingsStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
