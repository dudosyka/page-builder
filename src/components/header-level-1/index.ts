import {EditableElement} from "../../lib/element/editable-element.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import template from "./template.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";

export class HeaderLevel1 extends EditableElement {
  override name: string = "Header level 1";
  constructor(headerTitle: string = "Header level 1", attributes: AttributePropertyGroup = new AttributePropertyGroup) {
    super("h1", template(headerTitle), attributes, EmptyElementSettings);
  }
}