import {ElementConfiguration} from "@element/configuration/element-configuration.ts";
import {Template, TemplateData} from "@element/template/template.ts";
// import {ContainerElement} from "@element/container/container.element.ts";
import {ElementEventListener} from "./events/element-event-listener.ts";
import {Module} from "@module/module.ts";
import EmptyElementConfiguration from "@element/configuration/empty-element-configuration.ts";
import {AttributeCollection} from "@element/attributes/attribute-collection.ts";
import {PropertyCollection} from "@element/property/property-collection.ts";
import Parent from "@element/container/parent.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";
import EmptyTemplate from "@element/template/empty.template.ts";

export type ParentElement = Element & Parent

export abstract class Element {
  public htmlElement: HTMLElement
  public parent: ParentElement | null = null
  protected _parentModule: Module | null = null

  protected elementKey: string

  public insertable: boolean = false
  public name: string = "Element";

  protected mouseIn: boolean = false

  protected _eventListeners: Record<string, [string, EventListener]> = {}

  constructor(
    public elementName: string,
    public attributes: AttributeCollection = new BaseAttributeCollection(),
    protected template: Template = EmptyTemplate,
    protected properties: PropertyCollection = PropertyCollection.empty(),
    protected _configuration: ElementConfiguration = EmptyElementConfiguration,
  ) {
    this.htmlElement = document.createElement(elementName)
    this.elementKey = `${Date.now()}${elementName}`
  }

  protected renderAttributes() {
    const properties = this.attributes.getAll()
    properties.forEach(prop => {
      this.htmlElement.setAttribute(prop.name, prop.getValue())
    })
    if (this._parentModule)
      this.htmlElement.setAttribute(this._parentModule.scopeId, "")
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
    this._eventListeners[name] = [eventName, eventListener]
  }

  public addListener<T extends Event>(name: string, eventName: string, listener: ElementEventListener<T>): void {
    const eventListener = (event: Event) => {
      listener(event as T, this)
    }
    this.htmlElement.addEventListener(eventName, eventListener)
    this._eventListeners[name] = [eventName, eventListener]
  }

  private _removeListener(name: string) {
    const event = this._eventListeners[name]
    if (!event)
      throw new DOMException("Event listener not found")

    const removed = [ this._eventListeners[name][0], this._eventListeners[name][1] ]
    delete this._eventListeners[name]

    return removed
  }

  public removeListener(name: string) {
    const event = this._removeListener(name)
    this.htmlElement.removeEventListener(event[0] as string, event[1] as EventListener, false)
  }

  public removeGlobalListener(name: string) {
    const event = this._removeListener(name)
    document.removeEventListener(event[0] as string, event[1] as EventListener, false)
  }

  protected abstract setup(): void

  protected inherit(module: Module | null) {
    this._parentModule = module

    if (module)
      this._configuration = module.simpleElementConfiguration
  }

  private initializeListeners() {
    this.addListener<MouseEvent>("default-click", "click", (event) => {
      event.stopPropagation()
      this._configuration.click(event, this)
    })
    this.addListener<MouseEvent>("default-dblclick", "dblclick", (event) => {
      event.stopPropagation()
      this._configuration.dblClick(event, this)
    })
    this.addListener<MouseEvent>("default-mouseover", "mouseover", (event) => {
      event.stopPropagation()
      this._configuration.mouseOver(event, this)
    })
    this.addListener<MouseEvent>("default-mouseleave", "mouseleave", (event) => {
      event.stopPropagation()
      this._configuration.mouseLeave(event, this)
    })
  }

  private init(parent: Module | null) {
    if (parent)
      this.inherit(parent);
    this.initializeListeners()
    this.setup()
    this.render()
  }

  public mount(parent: ParentElement): void {
    this.parent = parent
    this.init(this.parent._parentModule)
  }

  public mountOnHtml(parentId: string, parentModule: Module) {
    const element = document.getElementById(parentId)
    if (!element)
      throw new DOMException(`Parent element with id = ${parentId} not found`)

    element.appendChild(this.htmlElement)

    this.init(parentModule)
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