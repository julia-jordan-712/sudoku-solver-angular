import { Component, Input } from '@angular/core';
import { ObjectWithId } from '@app/shared/types/object-with-id';

@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss'],
})
export class DropdownInputComponent<T extends ObjectWithId> {
  @Input()
  label: string | undefined;

  @Input({ required: true })
  items: T[] = [];

  trackByFn(_: number, item: T): string {
    return item.id;
  }
}
