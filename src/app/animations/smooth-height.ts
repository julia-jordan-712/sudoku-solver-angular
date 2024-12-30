import { animate, style, transition, trigger } from "@angular/animations";

export const smoothHeight = trigger("smoothHeight", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    animate("200ms ease", style({ height: "*" })),
  ]),
  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    animate("200ms ease", style({ height: 0 })),
  ]),
]);
