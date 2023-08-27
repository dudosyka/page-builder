import EmptyTemplate from "@element/template/empty.template.ts";
import {Element} from "@element/element.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";

export class Input extends Element {
  override name: string = "Input"
  constructor(
    private initValue: string
  ) {
    super(
      "input",
      EmptyTemplate,
      new BaseAttributeCollection,
    );
  }

  protected setup() {
    (this.htmlElement as HTMLInputElement).value = this.initValue
  }
}