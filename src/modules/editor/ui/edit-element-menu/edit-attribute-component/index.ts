import EmptyTemplate from "@element/template/empty.template.ts";
import {Attribute} from "@element/attributes/attribute.ts";
import {InputGroup} from "@components/input-group";
import {Button} from "@components/button";
import {ContainerElement} from "@element/container/container.element.ts";
import {BaseAttributeCollection} from "@attributes/collections/base.attribute-collection.ts";
import ClassAttribute from "@attributes/attributes/class.attribute.ts";

export class EditAttributeComponent extends ContainerElement {
  constructor(private attribute: Attribute, private onSaveCallback: (newValue: string) => void) {
    super(
      "div",
      EmptyTemplate,
      new BaseAttributeCollection,
    );
  }

  protected setup(): void {
    this.attributes.attribute<ClassAttribute>(ClassAttribute).setValue(["container", "d-flex", "p-2"])
    const attributeInput = new InputGroup(this.attribute.getValue(), this.attribute.name)
    const saveBtn = new Button("Save")
    saveBtn.htmlElement.addEventListener("click", () => this.onSaveCallback(attributeInput.getInputValue()))
    saveBtn.updateAttributes((saveBtnAttributes) => {
      saveBtnAttributes.attribute<ClassAttribute>(ClassAttribute).setValue(["btn btn-success"])
    })
    this.addChild(attributeInput)
    this.addChild(saveBtn)
  }
}