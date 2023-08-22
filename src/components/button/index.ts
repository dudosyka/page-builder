import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import template from "./template.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import {Element} from "../../lib/element/element.ts";

export class Button extends Element {
  override name: string = "Simple Button";
  constructor(btnTitle: string = "Simple Button", attributes: AttributePropertyGroup = new AttributePropertyGroup) {
    super("button", template(btnTitle), attributes, EmptyElementSettings);
  }

  protected setup() {}
}