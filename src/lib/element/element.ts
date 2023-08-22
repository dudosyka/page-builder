import {ElementSettings} from "./settings/element-settings.ts";
import {Template, TemplateData} from "./template/template.ts";
import {ContainerElement} from "./container/container-element.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import state from "../../modules/state/event-driven-state.ts";
import {EditorMenuType, MenuChanged, SearchHoverChanged} from "../../modules/state/events.ts";
import {ElementEventListener} from "./events/element-event-listener.ts";
import {StateListener} from "../../modules/state/state-listener.ts";
import {Event as StateEvent} from "../../modules/state/event.ts";

export abstract class Element implements StateListener {
  public htmlElement: HTMLElement
  protected parent: ContainerElement | null = null
  protected elementKey: string

  public frameElement: boolean = true
  public insertable: boolean = false
  public name: string = "Element";

  protected mouseIn: boolean = false
  private eventListeners: Record<string, [string, EventListener]> = {}

  constructor(
    public elementName: string,
    protected template: Template,
    public attributes: AttributePropertyGroup,
    protected settings: ElementSettings
  ) {
    this.htmlElement = document.createElement(elementName)
    this.elementKey = `${Date.now()}${elementName}`
    state.subscribe(this, SearchHoverChanged)
  }

  pullStateChange(_: StateEvent): void {
    if (this.mouseIn)
      this.mouseLeave()
  }

  protected renderAttributes() {
    const properties = this.attributes.getAll()
    properties.forEach(prop => {
      this.htmlElement.setAttribute(prop.name, prop.getValue())
    })
  }

  public render(): void {
    this.htmlElement.innerHTML = this.template.generate()
    this.renderAttributes()
  }

  protected selected() {
    if (!this.frameElement)
      return
    state.push(new MenuChanged(EditorMenuType.EDIT_ELEMENT, this))
    console.log(`Element ${this.name}#${this.elementName} was selected`)
  }

  protected mouseOver(): void {
    if (this.parent && state.frameState.elementOnSearch) {
      this.mouseIn = true
      state.push(SearchHoverChanged)
      this.updateAttributes(_ => {
        // attr.classAttr.append(["web-builder__element-insertable-up-down"])
      })
    }
  }

  protected mouseLeave(): void {
    this.mouseIn = false
    this.updateAttributes(_ => {
      // attr.classAttr.remove(["web-builder__element-insertable-up-down"])
    })
  }

  public addGlobalListener<T extends Event>(name: string, eventName: string, listener: ElementEventListener<T>): void {
    const eventListener = (event: Event) => {
      listener(event as T, this)
    }
    document.addEventListener(eventName, eventListener)
    this.eventListeners[name] = [eventName, eventListener]
  }

  public addListener<T extends Event>(name: string, eventName: string, listener: ElementEventListener<T>): void {
    const eventListener = (event: Event) => {
      listener(event as T, this)
    }
    this.htmlElement.addEventListener(eventName, eventListener)
    this.eventListeners[name] = [eventName, eventListener]
  }

  public removeListener(name: string) {
    const event = this.eventListeners[name]
    if (!event)
      throw new DOMException("Event listener not found")

    this.htmlElement.removeEventListener(event[0], event[1], false)
  }

  public removeGlobalListener(name: string) {
    const event = this.eventListeners[name]
    if (!event)
      throw new DOMException("Event listener not found")

    document.removeEventListener(event[0], event[1], false)
  }

  protected abstract setup(): void

  public mount(parent: ContainerElement): void {
    if (parent.frameElement && this.frameElement) {
      this.htmlElement.addEventListener("dblclick", (event) => {
        event.stopPropagation()
        if (!state.frameState.elementOnSearch)
          this.selected()
      })
      this.htmlElement.addEventListener("mouseover", (event) => {
        event.stopPropagation()
        this.mouseOver()
      })
      this.htmlElement.addEventListener("mouseleave", (event) => {
        event.stopPropagation()
        this.mouseLeave()
      })
    }
    else
      this.frameElement = false

    this.setup()
    this.render()
    this.parent = parent
  }

  public mountOnHtml(parentId: string) {
    const element = document.getElementById(parentId)
    if (!element)
      throw new DOMException(`Parent element with id = ${parentId} not found`)
    this.setup()
    this.render()
    element.appendChild(this.htmlElement)
  }

  public unmount() {
    if (this.parent)
      this.parent.removeChild(this)

    this.htmlElement.remove()
  }

  public getAttributes(): AttributePropertyGroup {
    return this.attributes
  }

  public updateAttributes(attributes: (attributes: AttributePropertyGroup) => void): void {
    attributes(this.attributes)
    this.renderAttributes()
  }
  public updateData(data: TemplateData[]): void {
    this.template.updateData(data)
    this.render()
  }
}