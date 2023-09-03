import {Element} from "@element/element.ts";
import {ElementsCollection} from "@element/container/elements-collection.ts";

export default interface Parent {
  children: ElementsCollection

  addChild(element: Element): void;

 removeChild(element: Element): void;
}