import EmptyTemplate from "../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import {Label} from "./label";
import {Input} from "./input";
import {ContainerElement} from "../../lib/element/container/container-element.ts";

export class InputGroup extends ContainerElement {
  override name: string = "Input-Group"
  private readonly input: Input
  constructor(
    initValue: string,
    labelValue: string
  ) {
    super(
      "div",
      EmptyTemplate,
        new AttributePropertyGroup(),
        EmptyElementSettings,
    );
    const containerAttributes = new AttributePropertyGroup()
    containerAttributes.classAttr.setValue(["container row"])
    this.updateAttributes(containerAttributes)
    this.input = new Input(initValue)
    const label = new Label(labelValue)
    this.addChild(label)
    this.addChild(this.input)
  }

  getInputValue(): string {
    return (this.input.htmlElement as HTMLInputElement).value
  }
}