import template from "./template.ts";
import {Element} from "@element/element.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";

export class Button extends Element {
  override name: string = "Simple Button";
  constructor(btnTitle: string = "Simple Button", attributes: BaseAttributeCollection = new BaseAttributeCollection) {
    super("button", template(btnTitle), attributes);
  }

  protected setup() {}
}