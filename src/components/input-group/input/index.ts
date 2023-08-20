import {AttributePropertyGroup} from "../../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../../lib/element/settings/empty-element-settings.ts";
import {TemplateFreeElement} from "../../../lib/element/template-free-element.ts";

export class Input extends TemplateFreeElement {
  override name: string = "Input"
  constructor(
    initValue: string
  ) {
    super(
      "input",
      new AttributePropertyGroup,
      EmptyElementSettings
    );
    (this.htmlElement as HTMLInputElement).value = initValue
  }
}