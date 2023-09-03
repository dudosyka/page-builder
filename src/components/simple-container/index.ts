import EmptyTemplate from "@element/template/empty.template.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";
import {ContainerElement} from "@element/container/container.element.ts";
import ClassAttribute from "@attributes/attributes/class.attribute.ts";

export class SimpleContainer extends ContainerElement {
  override name: string = "Simple Container";
  constructor(attributes: BaseAttributeCollection = new BaseAttributeCollection) {
    super("div", attributes, EmptyTemplate);
  }

  protected setup() {
    this.attributes.attribute<ClassAttribute>(ClassAttribute).append(["web-builder__container"])
  }
}