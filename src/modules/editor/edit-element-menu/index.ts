import {ContainerElement} from "../../../lib/element/container/container-element.ts";
import EmptyTemplate from "../../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../../lib/property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../../lib/element/settings/empty-element-settings.ts";
import {Element} from "../../../lib/element/element.ts";
import {EditAttributeComponent} from "./edit-attribute-component";
import {Property} from "../../../lib/element/props/property.ts";

export class EditElementMenu extends ContainerElement {
  override frameElement = false
  override name = "Edit elements menu"
  constructor(private onEdit: Element) {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup,
      EmptyElementSettings
    );
  }

  protected setup(): void {
    this.attributes.classAttr.setValue(["container"])
    const attributes = this.onEdit.getAttributes()
    attributes.getAll().forEach(attr => {
      this.addChild(new EditAttributeComponent(attr, newValue => {
        this.onEdit.updateAttributes((attributes) => {
          attributes.update(attr.name, new Property(attr.name, newValue))
        })
      }))
    })
  }
}