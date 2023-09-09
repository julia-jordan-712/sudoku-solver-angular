import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  DropdownInputComponent,
  DropdownInputOption,
} from "./dropdown-input.component";

describe(DropdownInputComponent.name, () => {
  let component: DropdownInputComponent<DropdownInputOption>;
  let fixture: ComponentFixture<DropdownInputComponent<DropdownInputOption>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
