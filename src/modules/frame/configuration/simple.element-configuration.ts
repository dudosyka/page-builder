import {ElementConfiguration} from "@element/configuration/element-configuration.ts";
import {Element} from "@element/element.ts";

export default class SimpleElementConfiguration extends ElementConfiguration {
  override dblClick(event: MouseEvent, element: Element): void {
    console.log(`DBL click ${event} on element: ${element}`)
  }

  mouseLeave(event: MouseEvent, element: Element): void {
    console.log(`Mouse leave ${event} on element: ${element}`)
  }

  mouseOver(event: MouseEvent, element: Element): void {
    console.log(`Mouse enter ${event} on element: ${element}`)
  }

  click(event: MouseEvent, element: Element): void {
    console.log(`Mouse click ${event} on element ${element}`)
  }
}