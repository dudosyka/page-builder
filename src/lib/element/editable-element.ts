import {Template} from "./template/template.ts";
import {ElementSettings} from "./settings/element-settings.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import {Element} from "./element.ts";

export abstract class EditableElement extends Element {
  protected constructor(
    elementName: string,
    template: Template,
    attributes: AttributePropertyGroup,
    settings: ElementSettings
  ) {
    super(elementName, template, attributes, settings);
    this.htmlElement.setAttribute("contenteditable", "true")
  }
}