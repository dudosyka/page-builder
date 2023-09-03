import {Element} from "../element.ts";
import {ElementsCollection} from "@element/container/elements-collection.ts";
import Parent from "@element/container/parent.ts";
import {Module} from "@module/module.ts";
import {Template} from "@element/template/template.ts";
import EmptyTemplate from "@element/template/empty.template.ts";
import {AttributeCollection} from "@element/attributes/attribute-collection.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";
import {PropertyCollection} from "@element/property/property-collection.ts";
import {ElementConfiguration} from "@element/configuration/element-configuration.ts";
import EmptyElementConfiguration from "@element/configuration/empty-element-configuration.ts";

export abstract class ContainerElement extends Element implements Parent {
  override name = "Container"
  children: ElementsCollection = ElementsCollection.empty()

  constructor(
    elementName: string,
    attributes: AttributeCollection = new BaseAttributeCollection(),
    template: Template = EmptyTemplate,
    properties: PropertyCollection = PropertyCollection.empty(),
    _configuration: ElementConfiguration = EmptyElementConfiguration
    ) {
    super(elementName, attributes, template, properties, _configuration);
  }

  override render() {
    this.renderAttributes()
    this.children.renderElements()
  }

  protected inherit(module: Module | null) {
    super.inherit(module)

    if (module)
      this._configuration = module.containerElementConfiguration
  }

  public addChild(element: Element){
    element.mount(this)
    this.children.add(element)
    this.htmlElement.appendChild(element.htmlElement)
  }

  public removeChild(element: Element) {
    this.children.removeElementIfExists(element)
    this.htmlElement.removeChild(element.htmlElement)
  }
}