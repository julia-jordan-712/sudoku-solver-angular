import { Injectable } from "@angular/core";
import { DevFunctionActions } from "./dev-functions.actions";
import { DevFunctionsState } from "./dev-functions.state";
import { AppActions } from "@app/state/app-state";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: "root" })
export class DevFunctionsReducer {
  private createInitialState(): DevFunctionsState {
    return {
      isDev: !environment.production,
    };
  }

  getReducer(): ActionReducer<DevFunctionsState> {
    return createReducer(
      this.createInitialState(),
      on(
        AppActions.reinitialize,
        (_state, _action): DevFunctionsState => this.createInitialState(),
      ),
      on(
        AppActions.initFromState,
        (_state, _action): DevFunctionsState => this.createInitialState(),
      ),
      on(
        DevFunctionActions.hide,
        (state, _action): DevFunctionsState => ({ ...state, isDev: false }),
      ),
    );
  }
}
