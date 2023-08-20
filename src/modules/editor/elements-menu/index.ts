import {ContainerElement} from "../../../lib/element/container/container-element.ts";
import EmptyTemplate from "../../../lib/element/template/empty-template.ts";
import EmptyElementSettings from "../../../lib/element/settings/empty-element-settings.ts";
import components from "../../../components";
import {Button} from "../../../components/button";
import frameModule from "../../frame/frame-module.ts";
import {AttributePropertyGroup} from "../../../property/groups/attribute-property-group.ts";

export class ElementsMenu extends ContainerElement {
  override selectable = false
  constructor() {
    super(
      "div",
      EmptyTemplate,
      new AttributePropertyGroup,
      EmptyElementSettings
    );
    components.forEach(clazz => {
      const component = new clazz()
      const createBtn = new Button(`Create ${component.name}`)
      const btnAttributes = new AttributePropertyGroup()
      btnAttributes.classAttr.setValue(["btn btn-primary"])
      createBtn.updateAttributes(btnAttributes)
      createBtn.htmlElement.addEventListener("click", () => {
        frameModule.addElement(clazz)
      })
      this.addChild(createBtn)
    })
  }
  protected selected(): void {}
}