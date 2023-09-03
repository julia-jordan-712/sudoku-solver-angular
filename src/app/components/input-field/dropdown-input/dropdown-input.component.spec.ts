import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownInputComponent } from './dropdown-input.component';
import { ObjectWithId } from '@app/shared/types/object-with-id';

describe(DropdownInputComponent.name, () => {
  let component: DropdownInputComponent<ObjectWithId>;
  let fixture: ComponentFixture<DropdownInputComponent<ObjectWithId>>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
