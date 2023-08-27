import {Element} from "@element/element.ts";

export abstract class Property {
  abstract apply(element: Element): void
}