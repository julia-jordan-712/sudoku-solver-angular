import { createActionGroup, emptyProps } from "@ngrx/store";

export const DevFunctionActions = createActionGroup({
  source: "DevFunctions",
  events: {
    hide: emptyProps(),
  },
});
