import template from "./template.ts";
import {AttributePropertyGroup} from "../../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../../lib/element/settings/empty-element-settings.ts";
import {Element} from "../../../lib/element/element.ts";

export class Label extends Element {
  override name: string = "Label"
  constructor(labelValue: string = "") {
    super(
      "label",
      template(labelValue),
      new AttributePropertyGroup(),
      EmptyElementSettings
    );
  }
}