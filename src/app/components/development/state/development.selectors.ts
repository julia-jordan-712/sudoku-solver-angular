import { createFeatureSelector, createSelector } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { DevelopmentState, DevelopmentStateKey } from "./development.state";

const selectState =
  createFeatureSelector<DevelopmentState>(DevelopmentStateKey);

const selectShowDevelopmentFunctions = createSelector(
  selectState,
  (state: DevelopmentState) => state.show && !environment.production,
);

const selectTestSudokus = createSelector(
  selectState,
  (state: DevelopmentState) => state.testSudokus.options,
);

const selectSelectedTestSudoku = createSelector(
  selectState,
  (state: DevelopmentState) => {
    const selectedId = state.testSudokus.selectedId;
    return selectedId
      ? state.testSudokus.options.find((option) => option.id === selectedId)
      : null;
  },
);

export const DevelopmentSelectors = {
  selectShowDevelopmentFunctions,
  selectTestSudokus,
  selectSelectedTestSudoku,
};
