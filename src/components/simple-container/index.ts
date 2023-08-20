import {ContainerElement} from "../../lib/element/container/container-element.ts";
import SimpleContainerTemplate from "../../lib/element/template/empty-template.ts";
import EmptyPropertyGroup from "../../lib/element/props/empty-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";

export class SimpleContainer extends ContainerElement {
  constructor() {
    super("div", SimpleContainerTemplate, EmptyPropertyGroup, EmptyElementSettings);
  }
  protected selected(): void {
    console.log("selected")
  }
}