import {Element} from "./element.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import {ElementSettings} from "./settings/element-settings.ts";
import EmptyTemplate from "./template/empty-template.ts";

export abstract class TemplateFreeElement extends Element {
  protected constructor(
    elementName: string,
    attributes: AttributePropertyGroup,
    settings: ElementSettings
  ) {
    super(
      elementName, EmptyTemplate, attributes, settings
    );
  }

  render() {
    this.renderAttributes()
  }
}