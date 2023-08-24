import {ContainerElement} from "../../../lib/element/container/container-element.ts";
import EmptyTemplate from "../../../lib/element/template/empty-template.ts";
import EmptyElementSettings from "../../../lib/element/settings/empty-element-settings.ts";
import components, {ComponentType} from "../../../components";
import {Button} from "../../../components/button";
import {AttributePropertyGroup} from "../../../lib/property/groups/attribute-property-group.ts";
import {StateListener} from "../../../lib/state/state-listener.ts";
import {Event} from "../../../lib/state/event.ts";
import state from "../../../lib/state/event-driven-state.ts";
import {FrameStateDto, FrameStateModule, FrameStateUpdated} from "../../frame/frame-state-module.ts";
import {Element} from "../../../lib/element/element.ts";

export class ElementsMenu extends ContainerElement implements StateListener {
  override frameElement = false
  override name = "Create elements menu"
  private createComponentIcon: Button | null = null
  constructor() {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup,
      EmptyElementSettings
    );
    state.subscribe(this, new FrameStateUpdated)
  }

  private setupStickToMouse(component: Element) {
    this.createComponentIcon = new Button(`Create ${component.name}`)
    this.createComponentIcon.updateAttributes((attributes) => {
      attributes.classAttr.setValue(["btn", "btn-primary", "web-builder__mouse-create-icon"])
    })
    this.createComponentIcon.mountOnHtml("app")

    this.createComponentIcon.addGlobalListener("stick-to-cursor", "mousemove", (event: MouseEvent, btn) => {
      if (!state.frameState.elementOnSearch)
        return
      btn.htmlElement.style.transform = 'translateY('+(event.clientY-120)+'px)';
      btn.htmlElement.style.transform += 'translateX('+(event.clientX-50)+'px)';
    })
  }

  private setupComponentCreateBtn(clazz: ComponentType): Element {
    const component = new clazz()
    const createBtn = new Button(`Create ${component.name}`)

    createBtn.updateAttributes((btnAttributes) => {
      btnAttributes.classAttr.setValue(["btn", "btn-primary"])
    })

    createBtn.addListener("create-component", "click", (_, __) => {
      state.updateAndNotify<FrameStateDto>(FrameStateModule, (state) => {
        state.data.elementOnInsert = null
      })
      state.frameState.elementOnSearch = clazz
      this.setupStickToMouse(component)
    })

    return createBtn
  }

  protected setup(): void {
    components.forEach(clazz => {
      this.addChild(this.setupComponentCreateBtn(clazz))
    })
  }

  pullStateChange(_: Event): void {
    if (state.frameState.elementOnSearch == null && this.createComponentIcon)
      this.createComponentIcon.unmount()
      this.createComponentIcon = null
  }
}