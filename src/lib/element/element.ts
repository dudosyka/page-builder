import {ElementSettings} from "./settings/element-settings.ts";
import {Template, TemplateData} from "./template/template.ts";
import {ContainerElement} from "./container/container-element.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import state from "../../modules/state/event-driven-state.ts";
import {EditorMenuType, MenuChanged} from "../../modules/state/events.ts";

export abstract class Element {
  public htmlElement: HTMLElement
  protected parent: ContainerElement | null = null
  protected elementKey: string

  public selectable: boolean = true

  public name: string = "Element";

  constructor(
    public elementName: string,
    protected template: Template,
    protected attributes: AttributePropertyGroup,
    protected settings: ElementSettings
  ) {
    this.htmlElement = document.createElement(elementName)
    this.elementKey = `${Date.now()}${elementName}`
  }

  public renderAttributes() {
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
    if (!this.selectable)
      return
    state.push(new MenuChanged(EditorMenuType.EDIT_ELEMENT, this))
    console.log(`Element ${this.name}#${this.elementName} was selected`)
  }

  public mount(parent: ContainerElement): void {
    this.render()
    if (parent.selectable)
      this.htmlElement.addEventListener("dblclick", (event) => {
        event.stopPropagation()
        this.selected()
      })
    else
      this.selectable = false
    this.parent = parent
  }

  public mountOnHtml(parentId: string) {
    const element = document.getElementById(parentId)
    if (!element)
      throw new DOMException(`Parent element with id = ${parentId} not found`)

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

  public updateAttributes(attributes: AttributePropertyGroup): void {
    this.attributes = attributes
    this.renderAttributes()
  }
  public updateData(data: TemplateData[]): void {
    this.template.updateData(data)
    this.render()
  }
}