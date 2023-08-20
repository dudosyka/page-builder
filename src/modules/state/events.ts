import {Event} from "./event-driven-state.ts";
import {Element} from "../../lib/element/element.ts";

export enum EditorMenuType {
  MAIN, EDIT_ELEMENT
}
export class MenuChanged extends Event {

  constructor(
    public type: EditorMenuType = EditorMenuType.MAIN,
    public elementOnEdit: Element | null = null
  ) {
    super();
  }
}