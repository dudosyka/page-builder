import EmptyPropertyGroup from "../../lib/element/props/empty-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import frameTemplate from "../../templates/frame.template.ts";
import {ModuleElement} from "../../lib/element/container/module-element.ts";
import {SimpleContainer} from "../../components/simple-container";
import {HeaderLevel1} from "../../components/header-level-1";
import {Button} from "../../components/button";

export class FrameElement extends ModuleElement {
  constructor() {
    super(
      "div",
      frameTemplate,
      EmptyPropertyGroup,
      EmptyElementSettings
    );
    const simpleContainer = new SimpleContainer
    const header = new HeaderLevel1
    const header2 = new HeaderLevel1
    const button = new Button
    simpleContainer.addChild(header)
    simpleContainer.addChild(header2)
    simpleContainer.addChild(button)

    setTimeout(() => {
      simpleContainer.removeChild(header)
    }, 3000)

    this.addChild(simpleContainer)
  }
}