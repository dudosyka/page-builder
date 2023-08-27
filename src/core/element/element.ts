import {ElementConfiguration} from "./configuration/element-configuration.ts";
import {Template, TemplateData} from "./template/template.ts";
import {ContainerElement} from "./container/container.element.ts";
import {ElementEventListener} from "./events/element-event-listener.ts";
import {Module} from "../module/module.ts";
import EmptyElementConfiguration from "./configuration/empty-element-configuration.ts";
import {AttributeCollection} from "@element/attributes/attribute-collection.ts";
import {PropertyCollection} from "@element/property/property-collection.ts";

export abstract class Element {
  public htmlElement: HTMLElement
  protected parent: ContainerElement | null = null
  protected parentModule: Module | null = null
  protected elementKey: string

  public insertable: boolean = false
  public name: string = "Element";

  protected mouseIn: boolean = false

  private eventListeners: Record<string, [string, EventListener]> = {}

  constructor(
    public elementName: string,
    protected template: Template,
    public attributes: AttributeCollection,
    protected properties: PropertyCollection = PropertyCollection.empty(),
    protected settings: ElementConfiguration = EmptyElementConfiguration,
  ) {
    this.htmlElement = document.createElement(elementName)
    this.elementKey = `${Date.now()}${elementName}`
  }

  protected renderAttributes() {
    const properties = this.attributes.getAll()
    properties.forEach(prop => {
      this.htmlElement.setAttribute(prop.name, prop.getValue())
    })
  }

  protected applyProperties() {
    this.properties.getAll().forEach(prop => prop.apply(this))
  }

  public render(): void {
    this.htmlElement.innerHTML = this.template.generate()
    this.renderAttributes()
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

  private inherit(module: Module | null) {
    this.parentModule = module

    if (module) {
      if (this instanceof ContainerElement)
        this.settings = module.containerElementConfiguration
      else
        this.settings = module.simpleElementConfiguration
    }
  }

  private initialize() {
    this.htmlElement.addEventListener("dblclick", (event) => {
      event.stopPropagation()
      this.settings.dblClick(event, this)
    })
    this.htmlElement.addEventListener("mouseover", (event) => {
      event.stopPropagation()
      this.settings.mouseOver(event, this)
    })
    this.htmlElement.addEventListener("mouseleave", (event) => {
      event.stopPropagation()
      this.settings.mouseLeave(event, this)
    })
  }

  public mount(parent: ContainerElement): void {
    this.parent = parent
    this.inherit(parent.parentModule);
    this.initialize()
    this.setup()
    this.render()
  }

  public mountOnHtml(parentId: string, parentModule: Module) {
    this.inherit(parentModule)

    const element = document.getElementById(parentId)
    if (!element)
      throw new DOMException(`Parent element with id = ${parentId} not found`)

    this.initialize()
    this.setup()
    this.render()

    element.appendChild(this.htmlElement)
  }

  public unmount() {
    if (this.parent)
      this.parent.removeChild(this)

    this.htmlElement.remove()
  }

  public getAttributes(): AttributeCollection {
    return this.attributes
  }

  public updateAttributes(setter: (attributes: AttributeCollection) => void): void {
    setter(this.attributes)
    this.renderAttributes()
  }
  public updateData(data: TemplateData[]): void {
    this.template.updateData(data)
    this.render()
  }
}