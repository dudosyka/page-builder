import {Property} from "../../element/props/property.ts";

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

  append(value: string[]) {
    this.value += ` ${value.join(" ")}`
  }

  remove(value: string[]) {
    value.forEach(el => {
      this.value = this.value.replace(el, "")
    })
  }
}