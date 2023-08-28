import {Module} from "@module/module.ts";
import {SimpleContainer} from "@components/simple-container";
import {HeaderLevel1} from "@components/header-level-1";
import {Button} from "@components/button";
import {Element} from "@element/element.ts";
import {ElementsMenu} from "./ui/elements-menu";
import {EditElementMenu} from "./ui/edit-element-menu";
import {StateListener} from "@state/state-listener.ts";
import {EditorMenuType, MenuChanged} from "@state/events.ts";
import {Event} from "@state/event.ts";
import state from "@state/event-driven-state.ts";
import EmptyElementConfiguration from "@element/configuration/empty-element-configuration.ts";

export class EditorModule extends Module implements StateListener {
  private currentMenuElement: Element | null = null
  override simpleElementConfiguration = EmptyElementConfiguration
  override containerElementConfiguration = EmptyElementConfiguration
  override cssModules = import.meta.glob("../../themes/editor/*.module.css")
  override scopeId = "data-scope-editor"

  constructor() {
    super(new SimpleContainer);
    state.subscribe(this, new MenuChanged)
  }

  override setup(): void {
    super.setup()
    this.parentElement.mountOnHtml("editor", this)
    const simpleContainer = new SimpleContainer
    const editorHeader = new HeaderLevel1("Editor tab")
    const createElementsMenu = new Button("Create element")
    createElementsMenu.addListener("change-menu", "click", (_, __) => {
      state.push(new MenuChanged(EditorMenuType.MAIN))
    })
    simpleContainer.addChild(editorHeader)
    simpleContainer.addChild(createElementsMenu)
    this.parentElement.addChild(simpleContainer)
  }

  pullStateChange(event: Event): void {
    if (this.checkEventIsMenuChanged(event)) {
      const menuEvent = event as MenuChanged
      this.clearMenu()
      this.currentMenuElement = this.stateToElement(menuEvent.type, menuEvent.elementOnEdit)
      this.parentElement.addChild(this.currentMenuElement)
    }
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

  private checkEventIsMenuChanged(event: Event): event is MenuChanged {
    return event.name == (new MenuChanged).name
  }
}

export default new EditorModule