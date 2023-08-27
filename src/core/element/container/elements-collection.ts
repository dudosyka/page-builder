import {Element} from "../element.ts";
import {Collection} from "../../utils/collection.ts";

export class ElementsCollection extends Collection<Element> {
  add(value: Element): void {
    this.set(value.elementName, value)
  }

  removeElementIfExists(element: Element): boolean {
    return super.removeIfExists(element.elementName)
  }

  renderElements() {
    this.getAll().forEach(el => el.render())
  }

  static empty() {
    return new ElementsCollection
  }
}