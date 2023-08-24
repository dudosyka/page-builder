import {ContainerElement} from "../../lib/element/container/container-element.ts";
import SimpleContainerTemplate from "../../lib/element/template/empty-template.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import {AttributePropertyGroup} from "../../lib/property/groups/attribute-property-group.ts";

export class SimpleContainer extends ContainerElement {
  override name: string = "Simple Container";
  constructor(attributes: AttributePropertyGroup = new AttributePropertyGroup) {
    super("div", SimpleContainerTemplate, attributes, EmptyElementSettings);
  }

  protected setup() {
    this.attributes.classAttr.append(["web-builder__container"])
  }
}