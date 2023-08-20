import {ContainerElement} from "../../../lib/element/container/container-element.ts";
import EmptyTemplate from "../../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../../lib/element/settings/empty-element-settings.ts";
import {Element} from "../../../lib/element/element.ts";
import {EditAttributeComponent} from "./edit-attribute-component";
import {Property} from "../../../lib/element/props/property.ts";

export class EditElementMenu extends ContainerElement {
  constructor(private onEdit: Element) {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup,
      EmptyElementSettings
    );
    this.attributes.classAttr.setValue(["container"])
    const attributes = this.onEdit.getAttributes()
    attributes.getAll().forEach(attr => {
      this.addChild(new EditAttributeComponent(attr, newValue => {
        console.log(attr.name, new Property(attr.name, newValue))
        attributes.update(attr.name, new Property(attr.name, newValue))
        this.onEdit.updateAttributes(attributes)
      }))
    })
  }
}