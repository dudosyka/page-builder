import {Attribute} from "@element/attributes/attribute.ts";

export default class ClassAttribute extends Attribute {
  constructor() {
    super("class", "");
  }
  getValue(): string {
    return this.value;
  }

  setValue(value: string[] = []): void {
    this.value = value.join(" ")
  }

  append(value: string[]) {
    this.value += ` ${value.join(" ")}`
  }

  remove(value: string[]) {
    value.forEach(el => {
      this.value = this.value.replace(el, "")
    })
  }
}