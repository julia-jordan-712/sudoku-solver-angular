import { ViewState, ViewStateKey } from "@app/state/view-state/view.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState = createFeatureSelector<ViewState>(ViewStateKey);

const selectShowHelp = createSelector(
  selectState,
  (state: ViewState) => state.showHelp,
);

export const ViewSelectors = {
  selectShowHelp,
};
