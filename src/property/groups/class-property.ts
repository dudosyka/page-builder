import {Property} from "../../lib/element/props/property.ts";

export default class ClassProperty extends Property {
  constructor() {
    super("class", "");
  }
  getValue(): string {
    return this.value;
  }

  setValue(value: string[] = []): void {
    this.value = value.join(" ")
  }
}