import {
  DevFunctionsState,
  DevFunctionsStateKey,
} from "@app/components/dev-functions/state/dev-functions.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState =
  createFeatureSelector<DevFunctionsState>(DevFunctionsStateKey);

const selectIsDevelopment = createSelector(
  selectState,
  (state: DevFunctionsState) => state.isDev,
);

export const DevFunctionsSelectors = {
  selectIsDevelopment,
};
