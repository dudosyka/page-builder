import {Element} from "@element/element.ts";

export abstract class ElementConfiguration {
  abstract dblClick(event: MouseEvent, element: Element): void
  abstract mouseOver(event: MouseEvent, element: Element): void
  abstract mouseLeave(event: MouseEvent, element: Element): void
}