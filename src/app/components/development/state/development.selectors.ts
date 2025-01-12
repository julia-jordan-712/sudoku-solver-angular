import {
  DevelopmentState,
  DevelopmentStateKey,
} from "@app/components/development/state/development.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState =
  createFeatureSelector<DevelopmentState>(DevelopmentStateKey);

const selectIsDevelopment = createSelector(
  selectState,
  (state: DevelopmentState) => state.isDev,
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
  selectIsDevelopment,
  selectTestSudokus,
  selectSelectedTestSudoku,
};
