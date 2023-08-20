import {Element} from "../../lib/element/element.ts";
import EmptyPropertyGroup from "../../lib/element/props/empty-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import template from "./template.ts";

export class Button extends Element {
  constructor() {
    super("button", template("Simple Button"), EmptyPropertyGroup, EmptyElementSettings);
  }
  protected selected(): void {
  }

}