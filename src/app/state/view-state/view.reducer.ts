import { Injectable } from "@angular/core";
import { AppActions } from "@app/state/app-state";
import { ViewActions } from "@app/state/view-state/view.actions";
import { ViewState } from "@app/state/view-state/view.state";
import { ActionReducer, createReducer, on } from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class ViewReducer {
  private createInitialState(): ViewState {
    return {
      showHelp: false,
    };
  }

  getReducer(): ActionReducer<ViewState> {
    return createReducer(
      this.createInitialState(),
      on(
        AppActions.reinitialize,
        (_state, _action): ViewState => this.createInitialState(),
      ),
      on(
        AppActions.initFromState,
        (_state, action): ViewState => action.state.view,
      ),
      on(
        ViewActions.showHelp,
        (state, action): ViewState => ({ ...state, showHelp: action.show }),
      ),
    );
  }
}
