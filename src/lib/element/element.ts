import {PropertyGroup} from "./props/property-group.ts";
import {ElementSettings} from "./settings/element-settings.ts";
import {Template, TemplateData} from "./template/template.ts";
import {ContainerElement} from "./container/container-element.ts";

export abstract class Element {
  public htmlElement: HTMLElement
  protected parent: ContainerElement | null = null
  protected elementKey: string

  protected constructor(
    public elementName: string,
    protected template: Template,
    protected props: PropertyGroup,
    protected settings: ElementSettings
  ) {
    this.htmlElement = document.createElement(elementName)
    this.elementKey = `${Date.now()}${elementName}`
  }

  public render(): void {
    this.htmlElement.innerHTML = this.template.generate()
  }

  protected abstract selected(): void

  public mount(parent: ContainerElement): void {
    this.render()
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

  public update(template: Template): void {
    this.template = template
    this.render()
  }
  public updateData(data: TemplateData[]): void {
    this.template.updateData(data)
    this.render()
  }
}