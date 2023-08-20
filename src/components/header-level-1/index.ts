import {EditableElement} from "../../lib/element/editable-element.ts";
import EmptyPropertyGroup from "../../lib/element/props/empty-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import template from "./template.ts";

export class HeaderLevel1 extends EditableElement {
  constructor(headerTitle: string = "Header level 1") {
    super("h1", template(headerTitle), EmptyPropertyGroup, EmptyElementSettings);
  }
  protected selected(): void {}

}