import EmptyTemplate from "../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import {Label} from "./label";
import {Input} from "./input";
import {ContainerElement} from "../../lib/element/container/container-element.ts";

export class InputGroup extends ContainerElement {
  override name: string = "Input Group"
  private input: Input | null = null
  constructor(
    private initValue: string = "Test input",
    private labelValue: string = "Test label"
  ) {
    super(
      "div",
      EmptyTemplate,
        new AttributePropertyGroup(),
        EmptyElementSettings,
    );
  }

  override setup() {
    const containerAttributes = new AttributePropertyGroup()
    containerAttributes.classAttr.setValue(["container row"])
    this.updateAttributes(containerAttributes)
    this.input = new Input(this.initValue)
    const label = new Label(this.labelValue)
    this.addChild(label)
    this.addChild(this.input)
  }

  getInputValue(): string {
    if (this.input)
      return (this.input.htmlElement as HTMLInputElement).value
    else
      throw new DOMException("Input didnt mount")
  }
}