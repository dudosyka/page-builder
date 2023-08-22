import {Element} from "../../lib/element/element.ts";
import {Event} from "./event.ts";

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

export class SearchHoverChanged extends Event{
  override name: string = 'search-hover-changed:event';
}