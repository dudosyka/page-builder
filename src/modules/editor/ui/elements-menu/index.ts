import EmptyTemplate from "@element/template/empty.template.ts";
import {StateListener} from "@state/state-listener.ts";
import {Event} from "@state/event.ts";
import state from "@state/event-driven-state.ts";
import {FrameStateDto, FrameStateModule, FrameStateUpdated} from "../../../frame/frame.state-module.ts";
import {Element} from "@element/element.ts";
import editorModule from "../../editor.module.ts";
import {Button} from "@components/button";
import components, {ComponentType} from "@components/index.ts";
import {ContainerElement} from "@element/container/container.element.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";
import ClassAttribute from "@attributes/attributes/class.attribute.ts";

export class ElementsMenu extends ContainerElement implements StateListener {
  override name = "Create ui menu"
  private createComponentIcon: Button | null = null
  constructor() {
    super(
      "div",
      new BaseAttributeCollection,
      EmptyTemplate,
    );
    state.subscribe(this, new FrameStateUpdated)
    this.addGlobalListener<KeyboardEvent>("escape-create-element", "keydown", (event, _) => {
      if (event.code == "Escape") {
        if (state.frameState.elementOnInsert) {
          state.updateAndNotify<FrameStateDto>(FrameStateModule, (state) => {
            state.data.elementOnInsert = null
          })
        }
      }
    })
  }

  private setupStickToMouse(component: Element) {
    if (this.createComponentIcon) {
      this.createComponentIcon.unmount()
    }
    this.createComponentIcon = new Button(`Create ${component.name}`)
    this.createComponentIcon.updateAttributes((attributes) => {
      attributes.attribute<ClassAttribute>(ClassAttribute).setValue(["btn", "btn-primary", "web-builder__mouse-create-icon"])
    })
    this.createComponentIcon.mountOnHtml("app", editorModule)

    this.createComponentIcon.addGlobalListener("stick-to-cursor", "mousemove", (event: MouseEvent, btn) => {
      if (!state.frameState.elementOnInsert)
        return
      btn.htmlElement.style.transform = 'translateY('+(event.clientY-120)+'px)';
      btn.htmlElement.style.transform += 'translateX('+(event.clientX-50)+'px)';
    })
  }

  private setupComponentCreateBtn(clazz: ComponentType): Element {
    const component = new clazz()
    const createBtn = new Button(`Create ${component.name}`)

    createBtn.updateAttributes((btnAttributes) => {
      btnAttributes.attribute<ClassAttribute>(ClassAttribute).setValue(["btn", "btn-primary"])
    })

    createBtn.addListener("create-component", "click", (_, __) => {
      state.updateAndNotify<FrameStateDto>(FrameStateModule, (state) => {
        state.data.elementOnInsert = null
      })
      state.frameState.elementOnInsert = clazz
      this.setupStickToMouse(component)
    })

    return createBtn
  }

  protected setup(): void {
    components.forEach(clazz => {
      this.addChild(this.setupComponentCreateBtn(clazz))
    })
  }

  private checkEventIsFrameStateUpdated(event: Event): event is FrameStateUpdated {
    return event.name == (new FrameStateUpdated).name
  }

  pullStateChange(event: Event): void {
    console.log(event, this.createComponentIcon)
    if (state.frameState.elementOnInsert == null && this.createComponentIcon && this.checkEventIsFrameStateUpdated(event))
      this.createComponentIcon.unmount()
      this.createComponentIcon = null
  }
}