import {Attribute} from "@element/attributes/attribute.ts";

export class ContentEditableAttribute extends Attribute {
  override editable = false
  constructor() {
    super("contenteditable", "false")
  }

  getValue(): string {
    return super.getValue();
  }

  setValue(value: boolean) {
    this.value = value ? "true" : "false"
  }
}