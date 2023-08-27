import template from "./template.ts";
import {Element} from "@element/element.ts";
import {ContentEditableAttribute} from "@attributes/attributes/content-editable.attribute.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";

export class HeaderLevel1 extends Element {
  override name: string = "Header level 1";
  constructor(headerTitle: string = "Header level 1", attributes: BaseAttributeCollection = new BaseAttributeCollection()) {
    super("h1", template(headerTitle), attributes);
  }
  protected setup() {
    this.attributes.attribute<ContentEditableAttribute>(ContentEditableAttribute).setValue(true)
  }
}