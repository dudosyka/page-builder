import {Element} from "../element.ts";
import {ElementsCollection} from "./elements-collection.ts";
import state from "../../state/event-driven-state.ts";

export abstract class ContainerElement extends Element {
  override name = "Container"
  override insertable = true
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

  protected clicked() {
    if (!this.frameElement)
      return

    if (this.insertable && state.frameState.elementOnSearch) {
      this.addChild(new state.frameState.elementOnSearch())
    }
  }

  override mouseOver() {
    super.mouseOver()
    if (state.frameState.elementOnSearch && this.insertable) {
      this.mouseIn = true
      this.updateAttributes(attr => {
        attr.classAttr.append(["web-builder__container-insertable"])
      })
    }
  }

  override mouseLeave() {
    super.mouseLeave()
    this.updateAttributes(attr => {
      this.mouseIn = false
      attr.classAttr.remove(["web-builder__container-insertable"])
    })
  }

  override mount(parent: ContainerElement) {
    super.mount(parent);
    if (parent.frameElement && this.frameElement) {
      this.htmlElement.addEventListener("click", (event) => {
        event.stopPropagation()
        this.clicked()
      })
    }
  }
}