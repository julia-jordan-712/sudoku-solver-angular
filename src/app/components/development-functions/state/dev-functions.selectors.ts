import {
  DevFunctionsState,
  DevFunctionsStateKey,
} from "@app/components/development-functions/state/dev-functions.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectState =
  createFeatureSelector<DevFunctionsState>(DevFunctionsStateKey);

const selectIsDevelopment = createSelector(
  selectState,
  (state: DevFunctionsState) => state.isDev,
);

const selectTestSudokus = createSelector(
  selectState,
  (state: DevFunctionsState) => state.testSudokus.options,
);

const selectSelectedTestSudoku = createSelector(
  selectState,
  (state: DevFunctionsState) => {
    const selectedId = state.testSudokus.selectedId;
    return selectedId
      ? state.testSudokus.options.find((option) => option.id === selectedId)
      : null;
  },
);

export const DevFunctionsSelectors = {
  selectIsDevelopment,
  selectTestSudokus,
  selectSelectedTestSudoku,
};
