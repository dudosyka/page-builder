import {ContainerElement} from "./container-element.ts";

export abstract class ModuleElement extends ContainerElement {
  override frameElement = false
}