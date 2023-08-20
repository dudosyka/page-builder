import {ContainerElement} from "../../../../lib/element/container/container-element.ts";
import EmptyTemplate from "../../../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../../../lib/element/settings/empty-element-settings.ts";
import {InputGroup} from "../../../../components/input-group";
import {Button} from "../../../../components/button";
import {Property} from "../../../../lib/element/props/property.ts";

export class EditAttributeComponent extends ContainerElement {
  constructor(attribute: Property, onSaveCallback: (newValue: string) => void) {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup,
      EmptyElementSettings
    );
    this.attributes.classAttr.setValue(["container", "d-flex", "p-2"])
    console.log(attribute, attribute.getValue(), attribute.name)
    const attributeInput = new InputGroup(attribute.getValue(), attribute.name)
    const saveBtn = new Button("Save")
    saveBtn.htmlElement.addEventListener("click", () => onSaveCallback(attributeInput.getInputValue()))
    const saveBtnAttributes = new AttributePropertyGroup()
    saveBtnAttributes.classAttr.setValue(["btn btn-success"])
    saveBtn.updateAttributes(saveBtnAttributes)
    this.addChild(attributeInput)
    this.addChild(saveBtn)
  }
}