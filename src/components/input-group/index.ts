import {Label} from "./label";
import {Input} from "./input";
import {ContainerElement} from "@element/container/container.element.ts";
import EmptyTemplate from "@element/template/empty.template.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";
import ClassAttribute from "@attributes/attributes/class.attribute.ts";

export class InputGroup extends ContainerElement {
  override name: string = "Input Group"
  private input: Input | null = null
  constructor(
    private initValue: string = "Test input",
    private labelValue: string = "Test label"
  ) {
    super(
      "div",
        new BaseAttributeCollection,
      EmptyTemplate,
    );
  }

  override setup() {
    this.updateAttributes((attributes) => {
      const classAttr = attributes.get(ClassAttribute.name) as ClassAttribute
      classAttr.append(["container", "row"])
    })
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