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

const triggerName: KeyOf<SmoothHeightDirective> = "smoothHeight";
const paramName = "startHeight";
const animation = "100ms ease";
export const smoothHeightAnimation = trigger(triggerName, [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    animate(animation, style({ height: "*" })),
  ]),
  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    animate(animation, style({ height: 0 })),
  ]),
  transition(
    "* <=> *",
    [style({ height: `{{${paramName}}}px`, opacity: 0 }), animate(animation)],
    { params: { [paramName]: 0 } },
  ),
]);

interface SmoothHeight {
  value: boolean;
  params: { [paramName]: number };
}

@Directive({
  selector: "[appSmoothHeight]",
})
export class SmoothHeightDirective implements OnChanges {
  @Input()
  appSmoothHeight: any;
  trigger: boolean;
  paramValue: number;

  constructor(private element: ElementRef) {}

  @HostBinding(`@${triggerName}`)
  get smoothHeight(): SmoothHeight {
    return { value: this.trigger, params: { [paramName]: this.paramValue } };
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.paramValue = this.element?.nativeElement?.clientHeight ?? 0;
    this.trigger = !this.trigger;
  }
}
