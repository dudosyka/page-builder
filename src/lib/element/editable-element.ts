import {Template} from "./template/template.ts";
import {ElementSettings} from "./settings/element-settings.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import {Element} from "./element.ts";

export class EditableElement extends Element {
  constructor(
    elementName: string,
    template: Template,
    attributes: AttributePropertyGroup,
    settings: ElementSettings
  ) {
    super(elementName, template, attributes, settings);
    this.htmlElement.setAttribute("contenteditable", "true")
  }
}