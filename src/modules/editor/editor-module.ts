import {Module} from "../../lib/module/module.ts";
import {EditorElement} from "./editor-element.ts";
import {SimpleContainer} from "../../components/simple-container";
import {HeaderLevel1} from "../../components/header-level-1";
import {Button} from "../../components/button";
import state, {Event} from "../state/event-driven-state.ts";
import {Element} from "../../lib/element/element.ts";
import {ElementsMenu} from "./elements-menu";
import {EditElementMenu} from "./edit-element-menu";
import {StateListener} from "../state/state-listener.ts";
import {EditorMenuType, MenuChanged} from "../state/events.ts";

export class EditorModule extends Module implements StateListener {
  private currentMenuElement: Element | null = null
  constructor() {
    super(new EditorElement);
    state.subscribe(this, new MenuChanged)
  }
  setup(): void {
    this.parentElement.mountOnHtml("editor")
    const simpleContainer = new SimpleContainer
    const editorHeader = new HeaderLevel1("Editor tab")
    const createElementsMenu = new Button("Create element")
    createElementsMenu.htmlElement.addEventListener("click", () => {
      state.push(new MenuChanged(EditorMenuType.MAIN))
    })
    simpleContainer.addChild(editorHeader)
    simpleContainer.addChild(createElementsMenu)
    this.parentElement.addChild(simpleContainer)
  }

  private stateToElement(state: EditorMenuType, elementOnEdit: Element | null) {
    switch (state) {
      case EditorMenuType.MAIN:
        return new ElementsMenu()
      case EditorMenuType.EDIT_ELEMENT:
        return new EditElementMenu(elementOnEdit!)
      default:
        return new ElementsMenu()
    }
  }

  private clearMenu(): void {
    if (this.currentMenuElement != null)
      this.parentElement.removeChild(this.currentMenuElement)
  }

  pullStateChange(event: Event): void {
    //@ts-ignore
    const menuEvent = event as MenuChanged
    this.clearMenu()
    this.currentMenuElement = this.stateToElement(menuEvent.type, menuEvent.elementOnEdit)
    this.parentElement.addChild(this.currentMenuElement)
  }

}

export default new EditorModule