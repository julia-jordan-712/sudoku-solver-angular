import { Type } from "@angular/core";
import { CyChainable } from "@cypress/types/cy-chainable";
import { CyComponentInput } from "@cypress/types/cy-component-input";
import {
  MountConfig,
  mount as mountOriginal,
  MountResponse,
} from "cypress/angular";
import { TranslateTestingModule } from "ngx-translate-testing";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

function mount<T>(
  component: Type<T>,
  modules: Type<any> | Type<any>[],
  componentInput?: CyComponentInput<T>,
  config?: MountConfig<T>,
): CyChainable<MountResponse<T>> {
  const mountConfig: MountConfig<T> = { ...(config ?? {}) };
  mountConfig.imports = [
    ...(mountConfig.imports ?? []),
    TranslateTestingModule.withTranslations({
      // @ts-ignore Cannot find name 'require'
      en: require("src/assets/i18n/en.json"),
      // @ts-ignore Cannot find name 'require'
      de: require("src/assets/i18n/de.json"),
    }).withDefaultLanguage("en"),
  ];
  mountConfig.imports.push(modules);
  if (componentInput) {
    mountConfig.componentProperties = componentInput;
  }
  return mountOriginal(component, mountConfig);
}

Cypress.Commands.add("mount", mount);

// Example use:
// cy.mount(MyComponent)
