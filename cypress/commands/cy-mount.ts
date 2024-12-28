import { provideHttpClient } from "@angular/common/http";
import { Type } from "@angular/core";
import { Objects } from "@app/shared/util/objects";
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
  module: Type<any>,
  componentInput?: CyComponentInput<T>,
  config?: CyMountConfig<T>,
): CyChainable<MountResponse<T>> {
  const mountConfig: MountConfig<T> = { ...(config ?? {}) };

  mountConfig.imports = [
    ...(mountConfig.imports ?? []),
    TranslateTestingModule.withTranslations(
      Objects.mergeDeep<Translations>(config?.translations ?? {}, {
        // @ts-ignore Cannot find name 'require'
        en: require("src/assets/i18n/en.json"),
        // @ts-ignore Cannot find name 'require'
        de: require("src/assets/i18n/de.json"),
      }),
    ).withDefaultLanguage("en"),
  ];
  mountConfig.imports.push(module);

  mountConfig.providers = [
    // providing http client is necessary to be able to load SVG icons
    provideHttpClient(),
    ...(mountConfig.providers ?? []),
  ];

  if (componentInput) {
    mountConfig.componentProperties = componentInput;
  }
  return mountOriginal(component, mountConfig);
}

Cypress.Commands.add("mount", mount);
