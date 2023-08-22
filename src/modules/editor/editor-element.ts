import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import {ModuleElement} from "../../lib/element/container/module-element.ts";
import EmptyTemplate from "../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";

export class EditorElement extends ModuleElement {
  override selectable = false
  constructor() {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup(),
      EmptyElementSettings
    );
  }

  protected setup(): void {}
}