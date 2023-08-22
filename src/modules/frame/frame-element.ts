import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import frameTemplate from "../../templates/frame.template.ts";
import {ModuleElement} from "../../lib/element/container/module-element.ts";
import {SimpleContainer} from "../../components/simple-container";
import {AttributePropertyGroup} from "../../property/groups/attribute-property-group.ts";

export class FrameElement extends ModuleElement {
  constructor() {
    super(
      "div",
      frameTemplate,
      new AttributePropertyGroup(),
      EmptyElementSettings
    );
  }

  protected setup(): void {
    this.selectable = true
    const simpleContainer = new SimpleContainer
    // const header = new HeaderLevel1
    // const header2 = new HeaderLevel1
    // const button = new Button
    // simpleContainer.addChild(header)
    // simpleContainer.addChild(header2)
    // simpleContainer.addChild(button)

    this.addChild(simpleContainer)
  }
}