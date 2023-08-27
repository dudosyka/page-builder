import template from "./template.ts";
import {Element} from "@element/element.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";

export class Label extends Element {
  override name: string = "Label"
  constructor(labelValue: string = "") {
    super(
      "label",
      template(labelValue),
      new BaseAttributeCollection,
    );
  }
  protected setup() {}
}