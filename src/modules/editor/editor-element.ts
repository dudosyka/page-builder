import EmptyPropertyGroup from "../../lib/element/props/empty-property-group.ts";
import EmptyElementSettings from "../../lib/element/settings/empty-element-settings.ts";
import {ModuleElement} from "../../lib/element/container/module-element.ts";
import EmptyTemplate from "../../lib/element/template/empty-template.ts";
import {SimpleContainer} from "../../components/simple-container";
import {HeaderLevel1} from "../../components/header-level-1";

export class EditorElement extends ModuleElement {
  constructor() {
    super(
      "div",
      EmptyTemplate,
      EmptyPropertyGroup,
      EmptyElementSettings
    );
    const simpleContainer = new SimpleContainer
    const editorHeader = new HeaderLevel1("Editor tab")
    simpleContainer.addChild(editorHeader)
    this.addChild(simpleContainer)
  }
}