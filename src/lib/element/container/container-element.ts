import {Element} from "../element.ts";
import {ElementsCollection} from "./elements-collection.ts";

export abstract class ContainerElement extends Element {
  protected children: ElementsCollection = ElementsCollection.empty()

  override render() {
    this.renderAttributes()
    this.children.renderElements()
  }

  public addChild(element: Element){
    element.mount(this)
    this.children.add(element)
    this.htmlElement.appendChild(element.htmlElement)
  }

  public removeChild(element: Element) {
    this.children.removeIfExists(element)
    this.htmlElement.removeChild(element.htmlElement)
  }
}