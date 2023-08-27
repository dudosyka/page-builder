import EmptyTemplate from "@element/template/empty.template.ts";
import {Element} from "@element/element.ts";
import {EditAttributeComponent} from "./edit-attribute-component";
import {Attribute} from "@element/attributes/attribute.ts";
import {ContainerElement} from "@element/container/container.element.ts";
import ClassAttribute from "@attributes/attributes/class.attribute.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";

export class EditElementMenu extends ContainerElement {
  override name = "Edit ui menu"
  constructor(private onEdit: Element) {
    super(
      "div",
      EmptyTemplate,
      new BaseAttributeCollection,
    );
  }

  protected setup(): void {
    this.attributes.attribute<ClassAttribute>(ClassAttribute).setValue(["container"])
    const attributes = this.onEdit.getAttributes()
    attributes.getAll().forEach(attr => {
      if (attr.editable)
        this.addChild(new EditAttributeComponent(attr, newValue => {
          this.onEdit.updateAttributes((attributes) => {
            attributes.set(attr.name, new Attribute(attr.name, newValue))
          })
        }))
    })
  }
}