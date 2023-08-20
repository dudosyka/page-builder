import {Element} from "./element.ts";
import {Template} from "./template/template.ts";
import {PropertyGroup} from "./props/property-group.ts";
import {ElementSettings} from "./settings/element-settings.ts";

export class EditableElement extends Element {
  constructor(
    elementName: string,
    template: Template,
    props: PropertyGroup,
    settings: ElementSettings
  ) {
    super(elementName, template, props, settings);
    this.htmlElement.setAttribute("contenteditable", "true")
  }
  protected selected(): void {
  }
}