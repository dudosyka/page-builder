import {Event} from "./event-driven-state.ts";
import {Element} from "../../lib/element/element.ts";

export enum EditorMenuType {
  MAIN, EDIT_ELEMENT
}
export class MenuChanged extends Event {
  override name: string = "menu-changed:event";

  constructor(
    public type: EditorMenuType = EditorMenuType.MAIN,
    public elementOnEdit: Element | null = null
  ) {
    super();
  }

}