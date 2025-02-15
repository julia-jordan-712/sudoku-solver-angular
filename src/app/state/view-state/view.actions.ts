import { createActionGroup, props } from "@ngrx/store";

export const ViewActions = createActionGroup({
  source: "View",
  events: {
    "show help": props<{ show: boolean }>(),
  },
});
