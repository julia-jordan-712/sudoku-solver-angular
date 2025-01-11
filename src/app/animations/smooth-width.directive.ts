import { animate, style, transition, trigger } from "@angular/animations";
import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { KeyOf } from "@app/types/key-of";

const triggerName: KeyOf<SmoothWidthDirective> = "smoothWidth";
const paramName = "startWidth";
const animation = "100ms ease";
export const smoothWidthAnimation = trigger(triggerName, [
  transition(":enter", [
    style({ width: 0, overflow: "hidden" }),
    animate(animation, style({ width: "*" })),
  ]),
  transition(":leave", [
    style({ width: "*", overflow: "hidden" }),
    animate(animation, style({ width: 0 })),
  ]),
  transition(
    "* <=> *",
    [style({ width: `{{${paramName}}}px`, opacity: 0 }), animate(animation)],
    { params: { [paramName]: 0 } },
  ),
]);

interface SmoothWidth {
  value: boolean;
  params: { [paramName]: number };
}

@Directive({
  selector: "[appSmoothWidth]",
})
export class SmoothWidthDirective implements OnChanges {
  @Input()
  appSmoothWidth: any;
  trigger: boolean;
  paramValue: number;

  constructor(private element: ElementRef) {}

  @HostBinding(`@${triggerName}`)
  get smoothWidth(): SmoothWidth {
    return { value: this.trigger, params: { [paramName]: this.paramValue } };
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.paramValue = this.element?.nativeElement?.clientWidth ?? 0;
    this.trigger = !this.trigger;
  }
}
