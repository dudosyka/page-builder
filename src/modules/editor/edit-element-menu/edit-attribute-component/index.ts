import {ContainerElement} from "../../../../lib/element/container/container-element.ts";
import EmptyTemplate from "../../../../lib/element/template/empty-template.ts";
import {AttributePropertyGroup} from "../../../../property/groups/attribute-property-group.ts";
import EmptyElementSettings from "../../../../lib/element/settings/empty-element-settings.ts";
import {InputGroup} from "../../../../components/input-group";
import {Button} from "../../../../components/button";
import {Property} from "../../../../lib/element/props/property.ts";

export class EditAttributeComponent extends ContainerElement {
  constructor(private attribute: Property, private onSaveCallback: (newValue: string) => void) {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup,
      EmptyElementSettings
    );
  }

  protected setup(): void {
    this.attributes.classAttr.setValue(["container", "d-flex", "p-2"])
    const attributeInput = new InputGroup(this.attribute.getValue(), this.attribute.name)
    const saveBtn = new Button("Save")
    saveBtn.htmlElement.addEventListener("click", () => this.onSaveCallback(attributeInput.getInputValue()))
    saveBtn.updateAttributes((saveBtnAttributes) => {
      saveBtnAttributes.classAttr.setValue(["btn btn-success"])
    })
    this.addChild(attributeInput)
    this.addChild(saveBtn)
  }
}