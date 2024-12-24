import { Injectable } from "@angular/core";
import { DevFunctionsState } from "@app/components/dev-functions/state/dev-functions.state";
import { ActionReducer, createReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class DevFunctionsReducer {
  private createInitialState(): DevFunctionsState {
    return {
      isDev: !environment.production,
    };
  }

  getReducer(): ActionReducer<DevFunctionsState> {
    return createReducer(this.createInitialState());
  }
}
