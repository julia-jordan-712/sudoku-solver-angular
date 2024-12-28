import { MountConfig } from "cypress/angular";
import { Translations } from "ngx-translate-testing";

export interface CyMountConfig<T> extends MountConfig<T> {
  translations?: Translations;
}
