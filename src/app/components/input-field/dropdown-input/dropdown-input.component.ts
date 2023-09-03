import { Component, Input } from '@angular/core';
import { ObjectWithId } from '@app/shared/types/object-with-id';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss'],
})
export class DropdownInputComponent<T extends DropdownInputOption> {
  @Input()
  label: string | undefined;

  @Input({ required: true })
  items: T[] = [];

  trackByFn(_: number, item: T): string {
    return item.id;
  }
}

export interface DropdownInputOption extends ObjectWithId {
  name: Observable<string>;
}
