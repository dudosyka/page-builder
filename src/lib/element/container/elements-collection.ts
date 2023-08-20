import {Element} from "../element.ts";

export class ElementsCollection {
  private items: Record<string, Element> = {}

  add(value: Element): void {
    this.items[value.elementName] = value
  }

  get(key: string): Element {
    return this.items[key]
  }

  getAll(): Element[] {
    return Object.values(this.items)
  }

  remove(element: Element) {
    if (!this.items[element.elementName])
      throw new DOMException("Element not found")
    delete this.items[element.elementName]
  }

  removeIfExists(element: Element): boolean {
    if (!this.items[element.elementName])
      return false

    delete this.items[element.elementName]
    return true
  }

  renderElements() {
    this.getAll().forEach(el => el.render())
  }

  static empty() {
    return new ElementsCollection
  }
}