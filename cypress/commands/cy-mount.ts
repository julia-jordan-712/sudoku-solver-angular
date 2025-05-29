import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { APP_INITIALIZER, Type } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "@app/app-routing.module";
import { appStoreImports } from "@app/app.module";
import { SOLVER_PROVIDERS } from "@app/core/solver/sudoku-solver.provider";
import { appInitializer } from "@app/state/app-initialization.service";
import { Objects } from "@app/util/objects";
import { CyChainable } from "@cypress/types/cy-chainable";
import { CyComponentInput } from "@cypress/types/cy-component";
import { CyMountConfig } from "@cypress/types/cy-mount-config";
import {
  MountConfig,
  mount as mountOriginal,
  MountResponse,
} from "cypress/angular";
import { TranslateTestingModule, Translations } from "ngx-translate-testing";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

function mount<T>(
  component: Type<T>,
  componentInput?: CyComponentInput<T>,
  config?: CyMountConfig<T>,
): CyChainable<MountResponse<T>> {
  const mountConfig: MountConfig<T> = { ...(config ?? {}) };

  mountConfig.imports = [
    AppRoutingModule,
    BrowserModule,
    ...appStoreImports,
    ...(mountConfig.imports ?? []),
    TranslateTestingModule.withTranslations(
      Objects.mergeDeep<Translations>(config?.translations ?? {}, {
        // @ts-ignore Cannot find name 'require'
        en: require("src/assets/i18n/en.json"),
        // @ts-ignore Cannot find name 'require'
        de: require("src/assets/i18n/de.json"),
      }),
    ).withDefaultLanguage("en"),
    NoopAnimationsModule,
  ];
  mountConfig.imports.push(component);

  mountConfig.providers = [
    // providing http client is necessary to be able to load SVG icons
    provideHttpClient(withInterceptorsFromDi()),
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true },
    ...SOLVER_PROVIDERS,
    ...(mountConfig.providers ?? []),
  ];

  if (componentInput) {
    mountConfig.componentProperties = componentInput;
  }
  return mountOriginal(component, mountConfig);
}

Cypress.Commands.add("mount", mount);
